export const Header = () => {
  return (
    <header className="bg-gray-200/20">
      <div className="container flex justify-between items-center px-4 mx-auto h-14">
        <nav className="md:hidden">
          <span className="text-sm cursor-pointer">三</span>
        </nav>
        <nav className="hidden md:flex items-center h-full gap-5">
          <a href="">HOME</a>
          <a href="">ABOUT</a>
        </nav>
        <div className="h-full flex items-center">
          <span className="inline-block size-4 bg-black rounded-full"></span>
        </div>
      </div>
    </header>
  );
};
