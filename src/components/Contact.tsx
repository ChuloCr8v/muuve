import useTheme from "@/hooks/useTheme";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaX,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Contact = () => {
  const [form] = useForm();

  const { darkMode } = useTheme();

  const socials = [
    {
      icon: FaFacebook,
      url: "https://www.facebook.com/nkematub",
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/nkematub",
    },
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/nkematub",
    },
    {
      icon: FaX,
      url: "https://www.x.com/c",
    },
  ];

  const contactDetails = [
    {
      label: "Email",
      value: "cleverdeveloper360@gmail.com",
      icon: FaEnvelope,
    },
    {
      label: "Phone",
      value: "+234 813 836 9977",
      icon: FaPhone,
    },
  ];

  const Heading = ({ heading }: { heading: string }) => {
    return <p className="font-semibold text-primary text-lg">{heading}</p>;
  };

  const formFields = [
    {
      label: "Full Name",
      required: true,
      placeholder: "Enter full name",
      type: "text",
      name: "fullName",
    },
    {
      label: "Email",
      required: true,
      placeholder: "Enter valid email address",
      type: "email",
      name: "fullName",
    },
    {
      label: "Location",
      required: false,
      placeholder: "Enter your location",
      type: "text",
      name: "location",
    },
    {
      label: "Enquiries",
      required: true,
      placeholder: "Please leave your mwssage",
      type: "textarea",
      name: "enquiries",
    },
  ];
  return (
    <section
      id="contact"
      className="w-full flex flex-col justify-center items-center mb-36 px-2"
    >
      <div className="flex flex-col md:justify-center items-center md:items-start gap-12 md:grid grid-cols-2 max-w-3xl w-full">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-3xl font-semibold">
            Got Enquires?
            <span
              className={twMerge(
                "block text-gray-600 font-normal text-base",
                darkMode && "text-gray-400"
              )}
            >
              Reach out to us today
            </span>
          </p>
          <div className="">
            <div className="space-y-4">
              <div className="space-y-3 md:space-y-1">
                <Heading heading="Our Socials" />
                <div className="flex justify-center md:justify-start items-center gap-2">
                  {socials.map((item) => (
                    <Button
                      size="small"
                      className="bg-transparent hover:!bg-transparent hover:!border-primary hover:!text-primary group"
                    >
                      <Link to={item.url}>
                        <item.icon
                          className={twMerge(
                            "text-md text-gray-900 group-hover:!text-primary duration-150",
                            darkMode && "text-gray-200"
                          )}
                        />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 md:space-y-1">
                <Heading heading="Our Contacts" />
                <div className="space-y-1">
                  {contactDetails.map((item) => (
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <item.icon />
                      <p className="font-normal">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-end items-end">
          <Form
            form={form}
            layout="vertical"
            className={twMerge(
              "bg-black/5 backdrop-blur-md w-full max-w-[400px] px-4 py-6 rounded-lg md:grid grid-cols-2 gap-x-3",
              darkMode && "bg-black/20"
            )}
          >
            <p
              className={twMerge(
                "text-xl text-center font-semibold my-4 text-black col-span-2",
                darkMode && "text-white"
              )}
            >
              Leave a message
            </p>
            {formFields.map((item) => (
              <Form.Item
                className={twMerge(
                  ["Location", "Enquiries"].includes(item.label) && "col-span-2"
                )}
                rules={[
                  {
                    required: item.required,
                    message: `${item.label} is required`,
                  },
                ]}
                label={
                  <span
                    className={twMerge("text-black", darkMode && "text-white")}
                  >
                    {item.label}
                  </span>
                }
                name={item.name}
              >
                {item.type === "text" || item.type === "email" ? (
                  <Input
                    className="bg-transparent"
                    placeholder={item.placeholder}
                  />
                ) : (
                  <TextArea
                    className="bg-transparent"
                    placeholder={item.placeholder}
                  />
                )}
              </Form.Item>
            ))}

            <Button
              type="primary"
              htmlType="submit"
              className="w-full col-span-2 mt-2 mb-4"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
