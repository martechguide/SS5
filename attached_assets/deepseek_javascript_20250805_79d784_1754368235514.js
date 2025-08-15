jQuery(document).ready(function($) {
    // Handle PDF file selection for preview
    $('#pdf-file').on('change', function(e) {
        var file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            var fileURL = URL.createObjectURL(file);
            renderPDFPreview(fileURL, 'pdf-preview');
            $('#pdf-preview-container').show();
            $('#confirm-upload').show();
        }
    });
    
    // Handle PDF URL for embed preview
    $('#pdf-embed-form').on('submit', function(e) {
        e.preventDefault();
        var pdfUrl = $('#pdf-url').val();
        if (pdfUrl) {
            renderPDFPreview(pdfUrl, 'embed-preview');
            $('#embed-preview-container').show();
            
            // Generate embed code
            var embedCode = '[pdf_embed url="' + pdfUrl + '" title="' + $('#embed-title').val() + '"]';
            $('#embed-code').val(embedCode);
        }
    });
    
    // Copy embed code to clipboard
    $('#copy-embed-code').on('click', function() {
        var embedCode = $('#embed-code');
        embedCode.select();
        document.execCommand('copy');
        $(this).text('Copied!');
        setTimeout(function() {
            $('#copy-embed-code').text('Copy to Clipboard');
        }, 2000);
    });
    
    // Tab switching
    $('.nav-tab-wrapper a').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        
        $('.nav-tab-wrapper a').removeClass('nav-tab-active');
        $(this).addClass('nav-tab-active');
        
        $('.tab-content').removeClass('active');
        $(target).addClass('active');
    });
    
    // PDF preview rendering function
    function renderPDFPreview(url, containerId) {
        // Initialize PDF.js
        pdfjsLib.getDocument(url).promise.then(function(pdf) {
            // Fetch the first page
            pdf.getPage(1).then(function(page) {
                var scale = 1.5;
                var viewport = page.getViewport({ scale: scale });
                
                // Prepare canvas
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                // Clear previous preview
                $('#' + containerId).html(canvas);
                
                // Render PDF page
                page.render({
                    canvasContext: context,
                    viewport: viewport
                });
            });
        }).catch(function(error) {
            $('#' + containerId).html('<div class="error">Error loading PDF: ' + error.message + '</div>');
        });
    }
    
    // Handle PDF upload form submission
    $('#pdf-upload-form').on('submit', function(e) {
        e.preventDefault();
        
        var formData = new FormData(this);
        
        $.ajax({
            url: pdfViewer.ajaxurl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', pdfViewer.nonce);
            },
            success: function(response) {
                if (response.success) {
                    alert('PDF uploaded successfully!');
                    window.location.reload();
                } else {
                    alert('Error: ' + response.data);
                }
            },
            error: function(xhr, status, error) {
                alert('AJAX Error: ' + error);
            }
        });
    });
    
    // Handle PDF deletion
    $('.delete-pdf').on('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this PDF?')) {
            var pdfId = $(this).data('id');
            
            $.ajax({
                url: pdfViewer.ajaxurl,
                type: 'POST',
                data: {
                    action: 'delete_pdf',
                    id: pdfId,
                    nonce: pdfViewer.nonce
                },
                success: function(response) {
                    if (response.success) {
                        alert('PDF deleted successfully!');
                        window.location.reload();
                    } else {
                        alert('Error: ' + response.data);
                    }
                }
            });
        }
    });
});