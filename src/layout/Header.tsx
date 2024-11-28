const Header = () => {
  return (
    <header className="backdrop-blur-3xl text-white fixed top-0 left-0 z-50 w-full flex flex-col items-center justify-center p-6">
      <div className="max-w-7xl w-full flex items-center justify-between">
        {" "}
        <h2 className="font-semibold  text-xl flex items-center gap-2">Logo</h2>
      </div>
    </header>
  );
};

export default Header;
