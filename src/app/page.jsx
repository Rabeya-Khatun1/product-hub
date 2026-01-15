import About from "@/page/About";
import CallAction from "@/page/CallAction";
import Categories from "@/page/Categories";
import Features from "@/page/Features";
import Hero from "@/page/Hero";
import Products from "@/page/Products";
import Testimonials from "@/page/Testmonials";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <Hero></Hero>
    <Features></Features>
    <About></About>
    <Categories></Categories>
    <Products></Products>
    <Testimonials></Testimonials>
    <CallAction></CallAction>
   </div>
  );
}
