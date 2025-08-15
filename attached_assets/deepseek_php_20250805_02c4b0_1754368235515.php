<?php
/*
Plugin Name: PDF Viewer & Uploader
Description: Responsive PDF viewer with upload and embed options
Version: 1.0
Author: Your Name
*/

// Security check
defined('ABSPATH') or die('No direct access!');

// Define constants
define('PDF_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('PDF_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include required files
require_once(PDF_PLUGIN_DIR . 'includes/pdf-functions.php');
require_once(PDF_PLUGIN_DIR . 'includes/pdf-shortcode.php');

// Register activation hook
register_activation_hook(__FILE__, 'pdf_viewer_activate');

function pdf_viewer_activate() {
    // Create upload directory if it doesn't exist
    $upload_dir = PDF_PLUGIN_DIR . 'uploads/';
    if (!file_exists($upload_dir)) {
        wp_mkdir_p($upload_dir);
    }
    
    // Add default options if needed
}

// Enqueue scripts and styles
add_action('wp_enqueue_scripts', 'pdf_viewer_enqueue_scripts');
add_action('admin_enqueue_scripts', 'pdf_viewer_admin_enqueue_scripts');

function pdf_viewer_enqueue_scripts() {
    wp_enqueue_style('pdf-viewer-css', PDF_PLUGIN_URL . 'assets/css/pdf-viewer.css');
    wp_enqueue_script('pdf-js', PDF_PLUGIN_URL . 'assets/js/pdf-viewer.js', array('jquery'), '1.0', true);
    wp_enqueue_script('pdfjs-dist', PDF_PLUGIN_URL . 'assets/pdfjs/pdf.js', array(), '2.0', true);
    
    // Localize script for AJAX
    wp_localize_script('pdf-js', 'pdfViewer', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('pdf_viewer_nonce')
    ));
}

function pdf_viewer_admin_enqueue_scripts($hook) {
    if ('toplevel_page_pdf-viewer-admin' !== $hook) {
        return;
    }
    
    wp_enqueue_style('pdf-viewer-admin-css', PDF_PLUGIN_URL . 'assets/css/pdf-viewer.css');
    wp_enqueue_script('pdf-admin-js', PDF_PLUGIN_URL . 'assets/js/pdf-admin.js', array('jquery'), '1.0', true);
    wp_enqueue_script('pdfjs-dist', PDF_PLUGIN_URL . 'assets/pdfjs/pdf.js', array(), '2.0', true);
}

// Add admin menu
add_action('admin_menu', 'pdf_viewer_admin_menu');

function pdf_viewer_admin_menu() {
    add_menu_page(
        'PDF Viewer Settings',
        'PDF Viewer',
        'manage_options',
        'pdf-viewer-admin',
        'pdf_viewer_admin_page',
        'dashicons-media-document',
        80
    );
}

function pdf_viewer_admin_page() {
    require_once(PDF_PLUGIN_DIR . 'admin/pdf-admin.php');
}