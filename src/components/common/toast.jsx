// react-bootstrap
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

const ToastInfo = ({ msg, show, onDismissToast }) => {
  return (
    <ToastContainer
      className="p-3"
      containerPosition="fixed"
      position="middle-center"
    >
      <Toast
        bg="dark"
        onClose={onDismissToast}
        show={show}
        delay={6000}
        autohide
      >
        <Toast.Header className="justify-content-end bg-white">
          <strong className="me-auto">Comfy</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastInfo;
