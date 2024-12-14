import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/react";

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

const AppNavbar = ({ color="bg-opacity-100", text="text-black"}) => {
    return (
        <Navbar className={`bg-white ${color}`}>
            <NavbarBrand>
                <img src="/Navbar.png" alt="logo" style={{ width: "50px", height: "auto" }} />
                <p className={`font-bold ${text} text-inherit`}>SkinScope</p>
            </NavbarBrand>
            <NavbarContent className={`hidden sm:flex gap-16 ${text}`} justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/info">
                        Info
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="/camera">
                        Camera
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/storyboard">
                        Experiences
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">   </Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="white" href="#" variant="flat">
                           
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default AppNavbar;