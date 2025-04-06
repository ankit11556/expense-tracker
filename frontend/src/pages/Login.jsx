const Login = () =>{
  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={user.password}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <button className="w-full bg-[#008080] text-white p-2 rounded" type="submit">
        Login
      </button>
    </form>
  </div>
  )
}

export default Login;