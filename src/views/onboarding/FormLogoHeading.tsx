import Logo from "../../../public/miro-color.png";

const FormLogoHeading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img src={Logo} alt="miro service management" className="h-10" />
      <p className="tracking-[0.2rem] text-center text-grey uppercase text-sm">
        Service Management
      </p>
    </div>
  );
};

export default FormLogoHeading;
