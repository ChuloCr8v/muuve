import Logo from "../../../public/miro-color.png";

const FormLogoHeading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={Logo} alt="miro service management" className="h-10" />
      <p className="">Billing System</p>
    </div>
  );
};

export default FormLogoHeading;
