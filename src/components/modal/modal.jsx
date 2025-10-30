import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { bindPageClick } from '../../services/contentService';

function App() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "Welcome!",
    content: "This is a demo website for HP Panchayat. All the data shown here is fictional and used for demonstration purposes only.<br /><br />Please do not share any personal or sensitive information on this platform.<br /><br />Thank you for understanding!"
  });
  const [isLoading, setIsLoading] = useState(false);

  // show modal only on home page
  useEffect(() => {
    setOpen(location.pathname === "/");
  }, [location.pathname]);

  // Fetch modal content from API
  useEffect(() => {
    const fetchModalContent = async () => {
      if (location.pathname === "/") {
        setIsLoading(true);
        try {
          const response = await bindPageClick('Modal');
          if (response.success && response?.data?.response?.data?.richText) {
            // Parse the rich text to extract title and content
            const htmlContent = response.data.response.data.richText;
            
            // Try to extract title from h1, h2, or first line
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            
            const titleElement = tempDiv.querySelector('h1, h2, .modal-title');
            let title = "Welcome!";
            let content = htmlContent;
            
            if (titleElement) {
              title = titleElement.textContent || title;
              titleElement.remove();
              content = tempDiv.innerHTML;
            }
            
            setModalContent({ title, content });
          }
        } catch (error) {
          console.error("Error fetching modal content:", error);
          // Keep default content if fetch fails
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchModalContent();
  }, [location.pathname]);

  // lock/unlock scroll + mimic Bootstrap body padding behavior
  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  return (
    <>
      {open && <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} />}

      {/* Modal (React controlled, no bootstrap JS) */}
      <div
        className={`modal fade ${open ? 'show d-block' : ''}`}
        tabIndex="-1"
        role="dialog"
        aria-modal={open ? "true" : "false"}
        aria-hidden={!open}
        style={open ? { zIndex: 1050 } : { display: 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalContent.title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="modal-body">
              {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: modalContent.content }} />
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setOpen(false)}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;