const AddExpensePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Expense</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            placeholder="Enter category"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700">Select Type</label>
          <select
            name="type"
           
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <input
            type="text"
            placeholder="Add a note (optional)"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#008080] text-white p-2 rounded hover:bg-[#006666] hover:cursor-pointer"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpensePage;
