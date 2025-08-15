<?php
// Register shortcode
add_shortcode('pdf_viewer', 'pdf_viewer_shortcode');
add_shortcode('pdf_embed', 'pdf_embed_shortcode');

function pdf_viewer_shortcode($atts) {
    $atts = shortcode_atts(array(
        'id' => 0,
        'width' => '100%',
        'height' => '600px'
    ), $atts);
    
    $pdf_data = pdf_viewer_get_pdf_by_id($atts['id']);
    if (!$pdf_data) {
        return '<div class="pdf-viewer-error">PDF not found</div>';
    }
    
    $pdf_url = PDF_PLUGIN_URL . 'uploads/' . $pdf_data['file_name'];
    
    ob_start();
    ?>
    <div class="pdf-viewer-container" style="width:<?php echo esc_attr($atts['width']); ?>;">
        <div class="pdf-viewer-toolbar">
            <div class="toolbar-group">
                <span class="pdf-title"><?php echo esc_html($pdf_data['title']); ?></span>
            </div>
            <div class="toolbar-group">
                <button class="pdf-toolbar-btn" onclick="pdfViewerZoomOut()">-</button>
                <span class="pdf-zoom-level">100%</span>
                <button class="pdf-toolbar-btn" onclick="pdfViewerZoomIn()">+</button>
                <button class="pdf-toolbar-btn" onclick="pdfViewerDownload()">Download</button>
            </div>
        </div>
        <div class="pdf-viewer-content">
            <iframe src="<?php echo esc_url(PDF_PLUGIN_URL . 'assets/pdfjs/web/viewer.html?file=' . urlencode($pdf_url)); ?>" 
                    width="100%" 
                    height="<?php echo esc_attr($atts['height']); ?>" 
                    frameborder="0" 
                    allowfullscreen></iframe>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

function pdf_embed_shortcode($atts) {
    $atts = shortcode_atts(array(
        'url' => '',
        'title' => 'PDF Document',
        'width' => '100%',
        'height' => '600px'
    ), $atts);
    
    if (empty($atts['url'])) {
        return '<div class="pdf-viewer-error">No PDF URL provided</div>';
    }
    
    ob_start();
    ?>
    <div class="pdf-viewer-container" style="width:<?php echo esc_attr($atts['width']); ?>;">
        <div class="pdf-viewer-toolbar">
            <div class="toolbar-group">
                <span class="pdf-title"><?php echo esc_html($atts['title']); ?></span>
            </div>
            <div class="toolbar-group">
                <button class="pdf-toolbar-btn" onclick="pdfViewerZoomOut()">-</button>
                <span class="pdf-zoom-level">100%</span>
                <button class="pdf-toolbar-btn" onclick="pdfViewerZoomIn()">+</button>
                <a href="<?php echo esc_url($atts['url']); ?>" class="pdf-toolbar-btn" download>Download</a>
            </div>
        </div>
        <div class="pdf-viewer-content">
            <iframe src="<?php echo esc_url(PDF_PLUGIN_URL . 'assets/pdfjs/web/viewer.html?file=' . urlencode($atts['url'])); ?>" 
                    width="100%" 
                    height="<?php echo esc_attr($atts['height']); ?>" 
                    frameborder="0" 
                    allowfullscreen></iframe>
        </div>
    </div>
    <?php
    return ob_get_clean();
}