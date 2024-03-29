import React, {useState,useRef, useEffect} from "react";
import { Navbar, Button, Text, Avatar, Dropdown, Input, useTheme, Row, Checkbox } from "@nextui-org/react";
import Link from 'next/link'
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { MdOutlineMessage, MdOutlineShoppingCart } from "react-icons/md";


export default function Nav(){

  const { data: session } = useSession();
  const router = useRouter();
  const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  } , []);


  const [visible, setVisible] = useState();

  
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
    <Image
    height={60}
    width={190}
    src='/images/logo.png'
    className="p-4"
    alt="logo"
    />
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
            <Link href={`/${session.user.role}`}>Profile</Link>
          </Dropdown.Item>
            <Dropdown.Item key="invest">
              <Link href={`/${session.user.role}/invest`}>Invest Now</Link>
            </Dropdown.Item>
            <Dropdown.Item key="earnings" withDivider>
              <Link href={`/${session.user.role}/earnings`}>Earnings</Link>
            </Dropdown.Item>
            <Dropdown.Item key="withdrawal">
              <Link href={`/${session.user.role}/withdrawals`}>Withdrawals</Link>
            </Dropdown.Item>
            <Dropdown.Item key="plans">
              <Link href={`/${session.user.role}/plans`}>Plans and Upgrade</Link>
            </Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              <Link href='/contact'>Help & Feedback</Link>
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
      <Navbar.Link href="/customer/register" css={{
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
      <Navbar.CollapseItem
      activeColor="warning"
      css={{
        color: '#ffffff',
      }}
  >
    <Link href='/'>
    Home
    </Link>
  </Navbar.CollapseItem>
    
      <Navbar.CollapseItem
      activeColor="warning"
      css={{
        color: '#ffffff',
      }}
  >
    <Link href='/offers'>
    <p>Offers</p>
    </Link>
  </Navbar.CollapseItem>

  <Navbar.CollapseItem
  activeColor="warning"
  css={{
    color: '#ffffff',
  }}
>
<Link href='/testimonials'>
<p className="text-primaryYellow">Testimonials</p>
</Link>
</Navbar.CollapseItem>

<Navbar.CollapseItem
activeColor="warning"
css={{
  color: '#ffffff',
}}
>
<Link href='/faq'>
<p className="text-primaryYellow">FAQ</p>
</Link>
</Navbar.CollapseItem>

<Navbar.CollapseItem
activeColor="warning"
css={{
  color: '#ffffff',
}}
>
<Link href='/contact'>
<p className="text-red-500">Contact</p>
</Link>
</Navbar.CollapseItem>
  
    </Navbar.Collapse>
  </Navbar>  
  </div>       
  )}
}