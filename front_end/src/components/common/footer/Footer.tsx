import { Copyright } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import MaxWidthWrapper from '../MaxWidthWrapper';

const Footer = () => {
  return (
    <footer className="w-full bg-white shadow dark:bg-gray-800">
      <MaxWidthWrapper className="w-full bg-white shadow dark:bg-gray-800">
        <div className="mx-auto w-full p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2024{' '}
            <a href="#" className="hover:underline">
              Trieu.hth
            </a>
            . All Rights Reserved.
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
