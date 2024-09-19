const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 h-[50px] z-50 text-[14px] text-[#777777] w-full items-center bg-white px-8 flex  justify-center md:justify-between  border-t">
      <span>
        Copyright ©{new Date().getFullYear()} All Rights Reserved Zoracom
      </span>
      <div className="space-x-8 flex">
        <span className="cursor-pointer">Terms</span>
        <span className="cursor-pointer">Privacy Policy</span>
      </div>
    </div>
  );
};

export default Footer;
