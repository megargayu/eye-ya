const Modal = ({ children, shown, setShown }) => {
  return (
    <div
      className={`${
        !shown && "hidden"
      } fixed z-50 w-full h-full left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center`}
      onClick={() => setShown(false)}
    >
      <div
        className="w-[640px] h-[480px] bg-slate-200 rounded-xl flex justify-center items-center flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
