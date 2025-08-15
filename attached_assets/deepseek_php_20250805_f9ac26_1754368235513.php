<?php
// Handle PDF uploads
add_action('admin_init', 'pdf_viewer_handle_upload');

function pdf_viewer_handle_upload() {
    if (isset($_POST['submit_pdf']) && current_user_can('upload_files')) {
        check_admin_referer('pdf_upload_nonce', 'pdf_upload_nonce');
        
        $upload_dir = PDF_PLUGIN_DIR . 'uploads/';
        $title = sanitize_text_field($_POST['pdf_title']);
        
        if (!empty($_FILES['pdf_file']['name'])) {
            $file = $_FILES['pdf_file'];
            
            // Validate file type
            $filetype = wp_check_filetype($file['name']);
            if ($filetype['ext'] !== 'pdf') {
                wp_die('Only PDF files are allowed.');
            }
            
            // Generate unique filename
            $filename = sanitize_file_name($title . '-' . uniqid() . '.pdf');
            $destination = $upload_dir . $filename;
            
            // Move uploaded file
            if (move_uploaded_file($file['tmp_name'], $destination)) {
                // Save to database
                $pdfs = get_option('pdf_viewer_uploads', array());
                $pdfs[] = array(
                    'id' => uniqid(),
                    'title' => $title,
                    'file_name' => $filename,
                    'upload_date' => current_time('mysql')
                );
                update_option('pdf_viewer_uploads', $pdfs);
                
                wp_redirect(admin_url('admin.php?page=pdf-viewer-admin&uploaded=1'));
                exit;
            } else {
                wp_die('Error uploading file.');
            }
        }
    }
}

// AJAX handler for PDF deletion
add_action('wp_ajax_delete_pdf', 'pdf_viewer_delete_pdf');

function pdf_viewer_delete_pdf() {
    check_ajax_referer('pdf_viewer_nonce', 'nonce');
    
    if (!current_user_can('upload_files')) {
        wp_send_json_error('Permission denied');
    }
    
    $pdf_id = sanitize_text_field($_POST['id']);
    $pdfs = get_option('pdf_viewer_uploads', array());
    $found = false;
    
    foreach ($pdfs as $key => $pdf) {
        if ($pdf['id'] === $pdf_id) {
            $file_path = PDF_PLUGIN_DIR . 'uploads/' . $pdf['file_name'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            unset($pdfs[$key]);
            $found = true;
            break;
        }
    }
    
    if ($found) {
        update_option('pdf_viewer_uploads', $pdfs);
        wp_send_json_success();
    } else {
        wp_send_json_error('PDF not found');
    }
}

// Helper function to get all uploaded PDFs
function pdf_viewer_get_uploaded_pdfs() {
    return get_option('pdf_viewer_uploads', array());
}

// Helper function to get PDF by ID
function pdf_viewer_get_pdf_by_id($id) {
    $pdfs = pdf_viewer_get_uploaded_pdfs();
    foreach ($pdfs as $pdf) {
        if ($pdf['id'] === $id) {
            return $pdf;
        }
    }
    return false;
}