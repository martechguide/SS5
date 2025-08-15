<div class="wrap">
    <h1>PDF Viewer & Uploader</h1>
    
    <div class="pdf-viewer-admin-container">
        <!-- Tab Navigation -->
        <h2 class="nav-tab-wrapper">
            <a href="#upload-pdf" class="nav-tab nav-tab-active">Upload PDF</a>
            <a href="#embed-pdf" class="nav-tab">Embed PDF</a>
            <a href="#manage-pdf" class="nav-tab">Manage PDFs</a>
        </h2>
        
        <!-- Upload PDF Tab -->
        <div id="upload-pdf" class="tab-content active">
            <h2>Upload PDF File</h2>
            <form id="pdf-upload-form" method="post" enctype="multipart/form-data">
                <?php wp_nonce_field('pdf_upload_nonce', 'pdf_upload_nonce'); ?>
                <div class="form-group">
                    <label for="pdf-file">Select PDF File:</label>
                    <input type="file" id="pdf-file" name="pdf_file" accept=".pdf" required>
                </div>
                <div class="form-group">
                    <label for="pdf-title">Title:</label>
                    <input type="text" id="pdf-title" name="pdf_title" required>
                </div>
                <div class="form-group">
                    <input type="submit" name="submit_pdf" class="button button-primary" value="Upload PDF">
                </div>
            </form>
            
            <div id="pdf-preview-container" style="display:none;">
                <h3>Preview</h3>
                <div id="pdf-preview"></div>
                <button id="confirm-upload" class="button button-primary" style="display:none;">Confirm Upload</button>
            </div>
        </div>
        
        <!-- Embed PDF Tab -->
        <div id="embed-pdf" class="tab-content">
            <h2>Embed PDF from External Source</h2>
            <form id="pdf-embed-form">
                <div class="form-group">
                    <label for="pdf-url">PDF URL:</label>
                    <input type="url" id="pdf-url" name="pdf_url" placeholder="https://example.com/document.pdf" required>
                </div>
                <div class="form-group">
                    <label for="embed-title">Title:</label>
                    <input type="text" id="embed-title" name="embed_title" required>
                </div>
                <div class="form-group">
                    <input type="submit" class="button button-primary" value="Generate Embed Code">
                </div>
            </form>
            
            <div id="embed-preview-container" style="display:none;">
                <h3>Preview</h3>
                <div id="embed-preview"></div>
                <div class="form-group">
                    <label for="embed-code">Embed Code:</label>
                    <textarea id="embed-code" rows="4" readonly></textarea>
                    <button id="copy-embed-code" class="button">Copy to Clipboard</button>
                </div>
            </div>
        </div>
        
        <!-- Manage PDFs Tab -->
        <div id="manage-pdf" class="tab-content">
            <h2>Manage Uploaded PDFs</h2>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>File Name</th>
                        <th>Shortcode</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $pdfs = pdf_viewer_get_uploaded_pdfs();
                    foreach ($pdfs as $pdf) {
                        echo '<tr>';
                        echo '<td>' . esc_html($pdf['title']) . '</td>';
                        echo '<td>' . esc_html($pdf['file_name']) . '</td>';
                        echo '<td>[pdf_viewer id="' . esc_attr($pdf['id']) . '"]</td>';
                        echo '<td><a href="#" class="button view-pdf" data-id="' . esc_attr($pdf['id']) . '">View</a> ';
                        echo '<a href="#" class="button delete-pdf" data-id="' . esc_attr($pdf['id']) . '">Delete</a></td>';
                        echo '</tr>';
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>