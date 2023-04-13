import React, {useState,useRef, useEffect} from "react";
import { Navbar,  Link, Button, Text, Avatar, Dropdown, Input, useTheme, Row, Checkbox } from "@nextui-org/react";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { MdOutlineMessage, MdOutlineShoppingCart } from "react-icons/md";


import logo from "../../public/images/logo.png";
import Testimonials from '../../pages/testimonials';


export default function Nav() {

  const { data: session } = useSession();
  const router = useRouter();
  const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  } , []);


  const [visible, setVisible] = useState();


  const collapseItems = [
    "Proile",
    "Activity",
    "Help & Feedback",
    "Log Out",
  ];
  
  if(!initialRenderComplete) {
    return null
  } else {
  return (
    <div className="w-screen">
    <Navbar variant="sticky" 
        css={{
            $$navbarBlurBackgroundColor: "#222224",
            $$navbarTextColor: "#FFFFFF",
            $$navbarContainerColor: "#222224",
            $$navbarContainerMaxWidth: "screen",
            fontFamily: "$Montserrat",
            $$navbarBackgroundColor: "#222224"
        }}
    >
    <Navbar.Toggle showIn="md" />
    <Navbar.Brand
      css={{
        "@xs": {
          w: "12%",
        },
      }}
    >
    {/*<Image
    height={40}
    width={120}
    src={logo}
    className="p-4"
    alt="logo"
    />*/}<p className="text-lg px-4 py-1 bg-primaryYellow/30 rounded-md">Crypto-Gen</p>
    </Navbar.Brand>
    <Navbar.Content
      activeColor="warning"
      hideIn="md"
      variant="underline"
      css={{
        "@xs": {
          w: "12%",
          jc: "center",
        },
      }}
    >
      <Navbar.Link href="/" 
        isActive={router.pathname == "/" ? true : false}>Home</Navbar.Link>
      <Navbar.Link href="/offers" 
        isActive={router.pathname.startsWith("/offers") ? true : false}>Offers</Navbar.Link>
      <Navbar.Link href="/testimonials" 
        isActive={router.pathname.startsWith("/testimonials") ? true : false}>Testimonials</Navbar.Link>
      <Navbar.Link href="/faq" 
        isActive={router.pathname.startsWith("/faq") ? true : false}>FAQ</Navbar.Link>
      <Navbar.Link href="/contact" 
        isActive={router.pathname.startsWith("/contact")  ? true : false}>Contact</Navbar.Link>

    </Navbar.Content>
   {session ? <>
    <Navbar.Content css={{
        "@xs": {
          w: "12%",
          jc: "flex-end",
        },
      }}
    >      
      <MdOutlineMessage size={24} />
      <Dropdown placement="bottom-right">
        <Navbar.Item>
          <Dropdown.Trigger>
          { session?.user?.profilePhoto ? 
            <Avatar 
                bordered
                as="button"
                color="warning"
                size="md"
                src={session?.user?.profilePhoto}
            /> : 
            <Avatar
                bordered
                as="button"
                color="warning"
                size="md"
                text={`${session?.user?.firstName.charAt(0)}${session?.user?.lastName.charAt(0)}`}
            />
          }
          </Dropdown.Trigger>  
        </Navbar.Item>
        <Dropdown.Menu
          aria-label="User menu actions"
          color="warning"
        >
          <Dropdown.Item key="user" css={{ height: "$18" }}>
            <Text b color="inherit" css={{ d: "flex" }}>
              Signed in as
            </Text>
            <Text b color="inherit" css={{ d: "flex" }}>
              {session?.user?.email}
            </Text>
          </Dropdown.Item>
          <Dropdown.Item key="profile" withDivider>
            Profile
          </Dropdown.Item>
          <Dropdown.Item key="orders" withDivider>
            Earnings
          </Dropdown.Item>
          <Dropdown.Item key="wishlist">Withdrawals</Dropdown.Item>
          <Dropdown.Item key="tracking">Plans & Upgrade</Dropdown.Item>
          <Dropdown.Item key="help_and_feedback" withDivider>
            Help & Feedback
          </Dropdown.Item>
          <Dropdown.Item key="logout" withDivider color="#fffffff">
            <button className="bg-red-600 text-white w-full rounded-md p-2" onClick={()=>signOut()}>Log Out</button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar.Content>
   </> : <>
    <Navbar.Content>
      <Navbar.Link href="/login" >Login</Navbar.Link>
      <Navbar.Link href="/join" css={{
            bg: "#FFAF2E",
            color: "#000000",
            p: "8px",
            br: "5px"
        }}>Join</Navbar.Link>
    </Navbar.Content>
   </>
    }

    <Navbar.Collapse
    css={{
      $$navbarListColor: "#222224",
      $$navbarListBlurBackgroundColor: "#222224",
      $$navbarListBlur: "20px",
      $$navbarTextColor: "#222224",
      background: "#222224",
  }}>
      {collapseItems.map((item, index) => (
        <Navbar.CollapseItem
          key={item}
          activeColor="warning"
          css={{
            color: index === collapseItems.length - 1 ? "$error" : "",
          }}
          isActive={index === 2}
        >
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href="#"
          >
            {item}
          </Link>
        </Navbar.CollapseItem>
      ))}
    </Navbar.Collapse>
  </Navbar>  
  </div>       
  )}
}