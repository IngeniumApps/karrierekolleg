import { Link, Element } from 'react-scroll';

export default function ScrollTest() {
  return (
    <div>
      <nav className="fixed top-0 bg-white w-full shadow z-50 p-4">
        <ul className="flex gap-4 justify-center">
          <li>
            <Link
              to="section1"
              smooth={true}
              duration={500}
              className="cursor-pointer text-blue-600"
            >
              Section 01
            </Link>
          </li>
          <li>
            <Link
              to="section2"
              smooth={true}
              duration={500}
              className="cursor-pointer text-blue-600"
            >
              Section 02
            </Link>
          </li>
        </ul>
      </nav>

      <div className="pt-24">
        <Element name="section1">
          <section className="h-screen bg-blue-100 flex items-center justify-center">
            <h2 className="text-3xl">Section 01</h2>
          </section>
        </Element>

        <Element name="section2">
          <section className="h-screen bg-green-100 flex items-center justify-center">
            <h2 className="text-3xl">Section 02</h2>
          </section>
        </Element>
      </div>
    </div>
  );
}
