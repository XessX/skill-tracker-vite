function ClearButton({ onClear }) {
    return (
      <button
        onClick={onClear}
        className="bg-red-700 hover:bg-red-800 text-white text-sm font-medium px-3 py-1.5 rounded shadow-sm transition duration-300 flex justify-center items-center gap-2"
      >
        ❌ <span>Clear</span>
      </button>
    );
  }  
export default ClearButton;
  