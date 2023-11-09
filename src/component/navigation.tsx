import { IsSignedIn, IsSignedOut } from "../Authical";
import UserButton from "../Authical/UserButton";


export default () => {
    return (
        <div className="navigation">
            <div className="navigation-container">
                <div className="logo">
                    <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
                        Authical
                    </a>
                </div>
                <div className="action">
                    <UserButton/>
                    <IsSignedIn>
                        <a href="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
                            <button style={{ height: "100%" }}>Dashboard</button>
                        </a>
                    </IsSignedIn>
                    <IsSignedOut>
                        <a href="/signin?signup">
                            <button>Create Account</button>
                        </a>
                        <a href="/signin">
                            <button>Sign In</button>
                        </a>
                    </IsSignedOut>
                </div>
            </div>
        </div>
    );
};
