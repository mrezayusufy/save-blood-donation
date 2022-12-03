import { Navbar } from 'konsta/react';
import { Logo } from "@/public/icons/logo-svg"
export default function Header({back = false}) {
  return (
    <header>
      <Navbar title="Save" subtitle="Blood Donation" left={back ? <p>back</p> : null} right={<Logo width={32} height={32} />} className="top-0 fixed" />
    </header>
  );
}
