-- Insert sample PDF data
INSERT INTO pdf_batches (id, title, description, is_active) VALUES 
('pdf-batch-1', 'Engineering Mathematics PDFs', 'Complete collection of mathematics PDFs for engineering students', true),
('pdf-batch-2', 'Science Reference Materials', 'Physics, Chemistry and Biology reference PDFs', true);

INSERT INTO pdf_courses (id, batch_id, title, description, is_active) VALUES 
('pdf-course-1', 'pdf-batch-1', 'Calculus and Algebra', 'Advanced mathematics concepts', true),
('pdf-course-2', 'pdf-batch-1', 'Statistics and Probability', 'Statistical analysis and probability theory', true),
('pdf-course-3', 'pdf-batch-2', 'Physics Fundamentals', 'Basic to advanced physics concepts', true);

INSERT INTO pdf_subjects (id, course_id, title, description, is_active) VALUES 
('pdf-subject-1', 'pdf-course-1', 'Differential Calculus', 'Limits, derivatives and applications', true),
('pdf-subject-2', 'pdf-course-1', 'Linear Algebra', 'Matrices, vectors and linear transformations', true),
('pdf-subject-3', 'pdf-course-3', 'Mechanics', 'Classical mechanics and motion', true);

INSERT INTO pdf_files (id, subject_id, title, description, file_url, embed_url, platform, page_count, is_active) VALUES 
('pdf-file-1', 'pdf-subject-1', 'Calculus Basics', 'Introduction to differential calculus', 'https://drive.google.com/file/d/1abc123/view', 'https://drive.google.com/file/d/1abc123/preview', 'google_drive', 25, true),
('pdf-file-2', 'pdf-subject-2', 'Matrix Operations', 'Complete guide to matrix operations', 'https://drive.google.com/file/d/1def456/view', 'https://drive.google.com/file/d/1def456/preview', 'google_drive', 32, true),
('pdf-file-3', 'pdf-subject-3', 'Newton Laws', 'Comprehensive study of Newtons laws', 'https://drive.google.com/file/d/1ghi789/view', 'https://drive.google.com/file/d/1ghi789/preview', 'google_drive', 18, true);

-- Insert sample PPT data
INSERT INTO ppt_batches (id, title, description, is_active) VALUES 
('ppt-batch-1', 'Engineering Presentations', 'Technical presentations for engineering concepts', true),
('ppt-batch-2', 'Business and Management', 'MBA and business strategy presentations', true);

INSERT INTO ppt_courses (id, batch_id, title, description, is_active) VALUES 
('ppt-course-1', 'ppt-batch-1', 'Computer Science Fundamentals', 'Programming and algorithms presentations', true),
('ppt-course-2', 'ppt-batch-1', 'Electronics Basics', 'Circuit analysis and design presentations', true),
('ppt-course-3', 'ppt-batch-2', 'Marketing Strategy', 'Digital marketing and brand management', true);

INSERT INTO ppt_subjects (id, course_id, title, description, is_active) VALUES 
('ppt-subject-1', 'ppt-course-1', 'Data Structures', 'Arrays, linked lists, trees and graphs', true),
('ppt-subject-2', 'ppt-course-1', 'Algorithms', 'Sorting, searching and optimization', true),
('ppt-subject-3', 'ppt-course-2', 'Digital Circuits', 'Logic gates and digital systems', true);

INSERT INTO ppt_files (id, subject_id, title, description, file_url, embed_url, platform, slide_count, is_active) VALUES 
('ppt-file-1', 'ppt-subject-1', 'Array Data Structure', 'Complete guide to arrays and operations', 'https://docs.google.com/presentation/d/1xyz123/edit', 'https://docs.google.com/presentation/d/1xyz123/embed', 'google_slides', 15, true),
('ppt-file-2', 'ppt-subject-2', 'Sorting Algorithms', 'Bubble sort, merge sort and quick sort', 'https://docs.google.com/presentation/d/1abc456/edit', 'https://docs.google.com/presentation/d/1abc456/embed', 'google_slides', 22, true),
('ppt-file-3', 'ppt-subject-3', 'Logic Gates Basics', 'AND, OR, NOT gates and combinations', 'https://docs.google.com/presentation/d/1def789/edit', 'https://docs.google.com/presentation/d/1def789/embed', 'google_slides', 12, true);