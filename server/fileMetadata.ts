import { createWriteStream, unlinkSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import https from 'https';
import http from 'http';

// Dynamic import for pdf-parse
let pdfParse: any;

interface FileMetadata {
  pageCount?: number;
  slideCount?: number;
  thumbnailUrl?: string;
  fileSize?: number;
  title?: string;
  extractedText?: string;
}

/**
 * Extract metadata from PDF/PPT files
 */
export async function extractFileMetadata(file: Buffer | string, platform: string, fileType: 'pdf' | 'ppt'): Promise<FileMetadata> {
  try {
    console.log(`Extracting metadata for ${fileType} from ${platform}`);
    
    // Initialize pdf-parse if needed
    if (!pdfParse && fileType === 'pdf') {
      pdfParse = (await import('pdf-parse')).default;
    }
    
    // If we have a Buffer (uploaded file), extract metadata directly
    if (Buffer.isBuffer(file) && fileType === 'pdf') {
      return await extractPdfFromBuffer(file);
    }
    
    // Handle URL-based platforms
    if (typeof file === 'string') {
      switch (platform) {
        case 'google_drive':
          return await extractGoogleDriveMetadata(file, fileType);
        case 'onedrive':
          return await extractOneDriveMetadata(file, fileType);
        case 'dropbox':
          return await extractDropboxMetadata(file, fileType);
        case 'scribd':
          return await extractScribdMetadata(file, fileType);
        case 'canva':
          return await extractCanvaMetadata(file, fileType);
        case 'google_slides':
          return await extractGoogleSlidesMetadata(file);
        case 'powerpoint_online':
          return await extractPowerPointOnlineMetadata(file);
        default:
          // Try generic URL extraction
          return await extractGenericUrlMetadata(file, fileType);
      }
    }
    
    // Default fallback
    return {
      pageCount: fileType === 'pdf' ? 1 : undefined,
      slideCount: fileType === 'ppt' ? 1 : undefined,
      fileSize: 0
    };
  } catch (error) {
    console.error(`Error extracting metadata:`, error);
    return {
      pageCount: fileType === 'pdf' ? 1 : undefined,
      slideCount: fileType === 'ppt' ? 1 : undefined,
      fileSize: 0
    };
  }
}

/**
 * Extract metadata directly from PDF buffer
 */
async function extractPdfFromBuffer(buffer: Buffer): Promise<FileMetadata> {
  try {
    if (!pdfParse) {
      pdfParse = (await import('pdf-parse')).default;
    }
    
    const data = await pdfParse(buffer);
    
    return {
      pageCount: data.numpages,
      fileSize: buffer.length,
      title: data.info?.Title || undefined,
      extractedText: data.text?.substring(0, 500) // First 500 chars for preview
    };
  } catch (error) {
    console.error('Error parsing PDF buffer:', error);
    return {
      pageCount: 1,
      fileSize: buffer.length
    };
  }
}

/**
 * Extract metadata from Google Drive URLs
 */
async function extractGoogleDriveMetadata(url: string, fileType: 'pdf' | 'ppt'): Promise<FileMetadata> {
  try {
    // Extract file ID from Google Drive URL
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!fileIdMatch) {
      throw new Error('Invalid Google Drive URL');
    }
    
    const fileId = fileIdMatch[1];
    
    // For PDFs, we can try to download and parse
    if (fileType === 'pdf') {
      const downloadUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;
      return await downloadAndExtractPdfMetadata(downloadUrl);
    } else {
      // For PPT files, estimate based on typical presentation length
      return {
        slideCount: 10, // Default estimate
        thumbnailUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h300`
      };
    }
  } catch (error) {
    console.error('Error extracting Google Drive metadata:', error);
    return getDefaultMetadata(fileType);
  }
}

/**
 * Extract metadata from OneDrive URLs
 */
async function extractOneDriveMetadata(url: string, fileType: 'pdf' | 'ppt'): Promise<FileMetadata> {
  // OneDrive metadata extraction would require API access
  // For now, return estimated values
  return {
    pageCount: fileType === 'pdf' ? 5 : undefined,
    slideCount: fileType === 'ppt' ? 8 : undefined
  };
}

/**
 * Extract metadata from Dropbox URLs
 */
async function extractDropboxMetadata(url: string, fileType: 'pdf' | 'ppt'): Promise<FileMetadata> {
  // Dropbox metadata extraction would require API access
  // For now, return estimated values
  return {
    pageCount: fileType === 'pdf' ? 3 : undefined,
    slideCount: fileType === 'ppt' ? 6 : undefined
  };
}

/**
 * Extract metadata from Scribd URLs
 */
async function extractScribdMetadata(url: string, fileType: 'pdf' | 'ppt'): Promise<FileMetadata> {
  // Scribd metadata would need web scraping or API access
  return {
    pageCount: fileType === 'pdf' ? 8 : undefined,
    slideCount: fileType === 'ppt' ? 12 : undefined
  };
}

/**
 * Extract metadata from Canva URLs
 */
async function extractCanvaMetadata(url: string, fileType: 'pdf' | 'ppt'): Promise<FileMetadata> {
  // Canva metadata would need API access
  return {
    pageCount: fileType === 'pdf' ? 4 : undefined,
    slideCount: fileType === 'ppt' ? 7 : undefined
  };
}

/**
 * Extract metadata from Google Slides URLs
 */
async function extractGoogleSlidesMetadata(url: string): Promise<FileMetadata> {
  // Google Slides metadata extraction would require API access
  return {
    slideCount: 9 // Default estimate
  };
}

/**
 * Extract metadata from PowerPoint Online URLs
 */
async function extractPowerPointOnlineMetadata(url: string): Promise<FileMetadata> {
  // PowerPoint Online metadata would require API access
  return {
    slideCount: 11 // Default estimate
  };
}

/**
 * Extract metadata from uploaded files
 */
async function extractUploadedFileMetadata(fileUrl: string, fileType: 'pdf' | 'ppt'): Promise<FileMetadata> {
  if (fileType === 'pdf') {
    return await downloadAndExtractPdfMetadata(fileUrl);
  } else {
    // PPT files would need specialized libraries
    return {
      slideCount: 6 // Default estimate
    };
  }
}

/**
 * Generic URL metadata extraction
 */
async function extractGenericUrlMetadata(url: string, fileType: 'pdf' | 'ppt'): Promise<FileMetadata> {
  if (fileType === 'pdf' && url.toLowerCase().includes('.pdf')) {
    return await downloadAndExtractPdfMetadata(url);
  }
  
  return getDefaultMetadata(fileType);
}

/**
 * Download and extract PDF metadata
 */
async function downloadAndExtractPdfMetadata(url: string): Promise<FileMetadata> {
  return new Promise(async (resolve) => {
    try {
      // Dynamically import pdf-parse
      if (!pdfParse) {
        pdfParse = (await import('pdf-parse')).default;
      }
      
      const tempFilePath = join(tmpdir(), `temp-pdf-${Date.now()}.pdf`);
      const file = createWriteStream(tempFilePath);
      
      const request = url.startsWith('https') ? https : http;
      
      const req = request.get(url, (response) => {
        if (response.statusCode !== 200) {
          resolve(getDefaultMetadata('pdf'));
          return;
        }
        
        response.pipe(file);
        
        file.on('finish', async () => {
          file.close();
          
          try {
            const dataBuffer = readFileSync(tempFilePath);
            const pdfData = await pdfParse(dataBuffer);
            
            // Clean up temp file
            unlinkSync(tempFilePath);
            
            resolve({
              pageCount: pdfData.numpages,
              fileSize: dataBuffer.length,
              extractedText: pdfData.text.substring(0, 500), // First 500 chars
              title: extractTitleFromText(pdfData.text)
            });
          } catch (error) {
            console.error('Error parsing PDF:', error);
            // Clean up temp file
            try {
              unlinkSync(tempFilePath);
            } catch {}
            resolve(getDefaultMetadata('pdf'));
          }
        });
      });
      
      req.on('error', () => {
        resolve(getDefaultMetadata('pdf'));
      });
      
      // Timeout after 30 seconds
      req.setTimeout(30000, () => {
        req.destroy();
        resolve(getDefaultMetadata('pdf'));
      });
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      resolve(getDefaultMetadata('pdf'));
    }
  });
}

/**
 * Extract title from PDF text content
 */
function extractTitleFromText(text: string): string | undefined {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length > 0) {
    // Return first meaningful line as potential title
    const firstLine = lines[0].trim();
    if (firstLine.length > 3 && firstLine.length < 100) {
      return firstLine;
    }
  }
  return undefined;
}

/**
 * Get default metadata for file types
 */
function getDefaultMetadata(fileType: 'pdf' | 'ppt'): FileMetadata {
  return {
    pageCount: fileType === 'pdf' ? 1 : undefined,
    slideCount: fileType === 'ppt' ? 1 : undefined,
    fileSize: 0
  };
}

/**
 * Generate thumbnail URL for preview (placeholder implementation)
 */
export function generateThumbnailUrl(url: string, platform: string, fileType: 'pdf' | 'ppt'): string | undefined {
  switch (platform) {
    case 'google_drive':
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (fileIdMatch) {
        return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w400-h300`;
      }
      break;
    case 'canva':
      // Canva might have thumbnail endpoints
      return url.replace('/view', '/thumbnail');
    default:
      break;
  }
  
  // Return placeholder thumbnail
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%236b7280" font-family="sans-serif" font-size="16">${fileType.toUpperCase()} Preview</text></svg>`;
}