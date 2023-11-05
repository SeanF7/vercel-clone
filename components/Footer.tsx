import React from "react";
import Image from "next/image";
import { HighlightedTextButton } from "./HighlightedTextButton";

export const Footer = () => {
  return (
    <footer className="border-t-2 border-neutral-800 bg-neutral-950 px-6 py-7 text-sm text-neutral-500">
      <div className="ml-auto mr-auto  max-w-7xl ">
        <div className=" flex flex-col">
          <div className="flex ">
            <div className="flex w-full flex-1 items-center justify-between md:justify-normal">
              <div className="flex gap-2">
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={26}
                  height={26}
                />
                <p>© 2023</p>
              </div>
              <div className="flex flex-row-reverse items-center rounded-md p-2 hover:bg-neutral-700 md:flex-row">
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                <p className="px-2 font-semibold text-blue-600">
                  All systems normal.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className=" hidden gap-1 rounded-md py-2 pl-2 pr-1 text-neutral-400 hover:bg-neutral-800 lg:flex">
                Command Menu
                <kbd className="ml-2 h-5 w-5 rounded-md bg-neutral-950 text-white shadow-[0_0px_0px_1px] shadow-neutral-800">
                  <span>⌘</span>
                </kbd>
                <kbd className="h-5 w-5 rounded-md bg-neutral-950 text-white shadow-[0_0px_0px_1px] shadow-neutral-800">
                  <span>K</span>
                </kbd>
              </button>
              <div className="hidden gap-4 md:flex">
                <button>
                  <svg height="16" viewBox="0 0 16 16" width="16">
                    <path
                      d="M5.82804 1.8717C3.30641 2.76542 1.5 5.17204 1.5 8.0001C1.5 11.5899 4.41015 14.5001 8 14.5001C10.8282 14.5001 13.2348 12.6936 14.1285 10.1718C13.3293 10.5427 12.4386 10.7499 11.5 10.7499C8.04822 10.7499 5.25 7.95172 5.25 4.49994C5.25 3.56144 5.45718 2.67078 5.82804 1.8717ZM0 8.0001C0 3.78268 3.26298 0.328073 7.40265 0.0220947L8.009 1.27881C7.22684 2.12601 6.75 3.25644 6.75 4.49994C6.75 7.12329 8.87665 9.24994 11.5 9.24994C12.7436 9.24994 13.8741 8.77304 14.7213 7.99079L15.978 8.59708C15.6722 12.7369 12.2175 16.0001 8 16.0001C3.58172 16.0001 0 12.4184 0 8.0001Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <button>
                  <svg height="16" viewBox="0 0 16 16" width="16">
                    <path
                      d="M8.75 0.75V0H7.25V0.75V2V2.75H8.75V2V0.75ZM11.182 3.75732L11.7123 3.22699L12.0659 2.87344L12.5962 2.34311L13.6569 3.40377L13.1265 3.9341L12.773 4.28765L12.2426 4.81798L11.182 3.75732ZM8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM13.25 7.25H14H15.25H16V8.75H15.25H14H13.25V7.25ZM0.75 7.25H0V8.75H0.75H2H2.75V7.25H2H0.75ZM2.87348 12.0659L2.34315 12.5962L3.40381 13.6569L3.93414 13.1265L4.28769 12.773L4.81802 12.2426L3.75736 11.182L3.22703 11.7123L2.87348 12.0659ZM3.75735 4.81798L3.22702 4.28765L2.87347 3.9341L2.34314 3.40377L3.4038 2.34311L3.93413 2.87344L4.28768 3.22699L4.81802 3.75732L3.75735 4.81798ZM12.0659 13.1265L12.5962 13.6569L13.6569 12.5962L13.1265 12.0659L12.773 11.7123L12.2426 11.182L11.182 12.2426L11.7123 12.773L12.0659 13.1265ZM8.75 13.25V14V15.25V16H7.25V15.25V14V13.25H8.75Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <button>
                  <svg height="16" viewBox="0 0 16 16" width="16">
                    <path
                      d="M0 2C0 1.44772 0.447715 1 1 1H15C15.5523 1 16 1.44772 16 2V10.5C16 11.0523 15.5523 11.5 15 11.5H8.75V14.5H9.75H10.5V16H9.75H6.25H5.5V14.5H6.25H7.25V11.5H1C0.447714 11.5 0 11.0523 0 10.5V2ZM1.5 2.5V10H14.5V2.5H1.5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid w-full gap-2 sm:grid-cols-3 md:flex md:justify-between ">
              <div className="order-2 col-span-2 mt-3 flex items-center md:order-none md:mt-0">
                <div className="flex w-1/2 items-center justify-start gap-4 md:w-auto">
                  <svg
                    aria-label="github"
                    height="19"
                    viewBox="0 0 14 14"
                    width="19"
                  >
                    <path
                      d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg height="16" viewBox="0 0 16 16" width="16">
                    <path
                      d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>

                <div className="flex gap-4 md:hidden">
                  <button>
                    <svg height="16" viewBox="0 0 16 16" width="16">
                      <path
                        d="M5.82804 1.8717C3.30641 2.76542 1.5 5.17204 1.5 8.0001C1.5 11.5899 4.41015 14.5001 8 14.5001C10.8282 14.5001 13.2348 12.6936 14.1285 10.1718C13.3293 10.5427 12.4386 10.7499 11.5 10.7499C8.04822 10.7499 5.25 7.95172 5.25 4.49994C5.25 3.56144 5.45718 2.67078 5.82804 1.8717ZM0 8.0001C0 3.78268 3.26298 0.328073 7.40265 0.0220947L8.009 1.27881C7.22684 2.12601 6.75 3.25644 6.75 4.49994C6.75 7.12329 8.87665 9.24994 11.5 9.24994C12.7436 9.24994 13.8741 8.77304 14.7213 7.99079L15.978 8.59708C15.6722 12.7369 12.2175 16.0001 8 16.0001C3.58172 16.0001 0 12.4184 0 8.0001Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                  <button>
                    <svg height="16" viewBox="0 0 16 16" width="16">
                      <path
                        d="M8.75 0.75V0H7.25V0.75V2V2.75H8.75V2V0.75ZM11.182 3.75732L11.7123 3.22699L12.0659 2.87344L12.5962 2.34311L13.6569 3.40377L13.1265 3.9341L12.773 4.28765L12.2426 4.81798L11.182 3.75732ZM8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM13.25 7.25H14H15.25H16V8.75H15.25H14H13.25V7.25ZM0.75 7.25H0V8.75H0.75H2H2.75V7.25H2H0.75ZM2.87348 12.0659L2.34315 12.5962L3.40381 13.6569L3.93414 13.1265L4.28769 12.773L4.81802 12.2426L3.75736 11.182L3.22703 11.7123L2.87348 12.0659ZM3.75735 4.81798L3.22702 4.28765L2.87347 3.9341L2.34314 3.40377L3.4038 2.34311L3.93413 2.87344L4.28768 3.22699L4.81802 3.75732L3.75735 4.81798ZM12.0659 13.1265L12.5962 13.6569L13.6569 12.5962L13.1265 12.0659L12.773 11.7123L12.2426 11.182L11.182 12.2426L11.7123 12.773L12.0659 13.1265ZM8.75 13.25V14V15.25V16H7.25V15.25V14V13.25H8.75Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                  <button>
                    <svg height="16" viewBox="0 0 16 16" width="16">
                      <path
                        d="M0 2C0 1.44772 0.447715 1 1 1H15C15.5523 1 16 1.44772 16 2V10.5C16 11.0523 15.5523 11.5 15 11.5H8.75V14.5H9.75H10.5V16H9.75H6.25H5.5V14.5H6.25H7.25V11.5H1C0.447714 11.5 0 11.0523 0 10.5V2ZM1.5 2.5V10H14.5V2.5H1.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <HighlightedTextButton text="Home" link="/home" />
              <HighlightedTextButton text="Documentation" link="/docs" />
              <HighlightedTextButton text="Guides" link="/guides" />
              <HighlightedTextButton text="Help" link="/help" />
              <HighlightedTextButton text="Contact Sales" link="/sales" />
              <HighlightedTextButton text="Blog" link="/blog" />
              <HighlightedTextButton text="Changelog" link="/changelog" />
              <HighlightedTextButton text="Pricing" link="/pricing" />
              <HighlightedTextButton text="Enterprise" link="/enterprise" />
              <button className="flex items-center">
                Legal
                <svg height="16" viewBox="0 0 16 16" width="16">
                  <path
                    d="M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
