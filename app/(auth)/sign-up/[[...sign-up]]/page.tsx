import {SignUp} from "@clerk/nextjs";
import backgroundImg from "../../../images/signUpBackground.jpg"
import Image from "next/image";

export default function Page() {
    return (
        <div className={"mt-24 flex justify-center"}>
            <Image
                alt="sign up"
                src={backgroundImg}
                className="absolute inset-0 h-full w-full opacity-80"
            />
            <SignUp/>
        </div>
    )
}