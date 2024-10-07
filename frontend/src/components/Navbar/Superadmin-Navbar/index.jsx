import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { logout } from '../../../redux/authSlice'; 

const SuperAdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to Redux
    navigate('/login'); // Redirect user to login page after logout
  };

  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 770);
      if (window.innerWidth > 770) {
        setMobileMenuVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  const navItems = [
    "Profile",
    "Customer Info",
    "Admin Info",
    "Live Data",
    "Recharge",
    "Show Transaction",
  ];

  return (
    <div>
      <div style={styles.navbar}>
        <div style={styles.navLogo}>
          <Link to="/superadmin" style={styles.navLogoLink}>
            <b>Domestic RO Controller</b>
          </Link>
        </div>
        {!isMobile ? (
          <div style={styles.navItems}>
            <ul style={styles.navList}>
              {navItems.map((item, index) => {
                const routePath = item === "Show Transaction" ? "transaction" : item.toLowerCase().replace(" ", "");
                return (
                  <li
                    style={styles.navListItem}
                    key={index}
                    onMouseEnter={() => setHoveredLink(routePath)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Link
                      to={`/superadmin/${routePath}`} // Updated to /superadmin
                      style={{
                        ...styles.navButton,
                        ...(hoveredLink === routePath ? styles.navButtonHover : {}),
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
              <li
                style={styles.navListItem}
                onMouseEnter={() => setHoveredLink("logout")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  style={{
                    ...styles.navButton,
                    ...styles.signOutLink,
                    ...(hoveredLink === "logout" ? styles.navButtonHover : {}),
                  }}
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div id="hamburger-menu" style={styles.hamburgerMenu} onClick={toggleMobileMenu}>
            &#9776;
          </div>
        )}
      </div>

      {mobileMenuVisible && (
        <div id="mobile-menu" style={styles.mobileMenu}>
          <div id="hamburger-cross" style={styles.hamburgerCross} onClick={closeMobileMenu}>
            &#10006;
          </div>
          <ul style={styles.mobileNavList}>
            {navItems.map((item, index) => {
              const routePath = item === "Show Transaction" ? "transaction" : item.toLowerCase().replace(" ", "");
              return (
                <li
                  style={styles.mobileNavItem}
                  key={index}
                  onMouseEnter={() => setHoveredLink(routePath)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    to={`/superadmin/${routePath}`} // Updated to /superadmin
                    style={{
                      ...styles.mobileNavLink,
                      ...(hoveredLink === routePath ? styles.mobileNavButtonHover : {}),
                    }}
                    onClick={closeMobileMenu}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
            <li
              style={styles.mobileNavItem}
              onMouseEnter={() => setHoveredLink("logout")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <button
                style={{
                  ...styles.mobileNavLink,
                  ...styles.mobileSignOutLink,
                  ...(hoveredLink === "logout" ? styles.mobileNavButtonHover : {}),
                }}
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    position: "relative",
    display: "flex",
    padding: "10px 20px",
    backgroundColor: "#f7f7f7",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "7px 5px 15px -4px rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  navLogoLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "32px",
    fontWeight: "bold",
  },
  navItems: {
    display: "flex",
  },
  navList: {
    display: "flex",
    gap: "15px",
    padding: 0,
    margin: 0,
    listStyle: "none",
    alignItems: "center",
  },
  navListItem: {
    position: "relative",
  },
  navButton: {
    color: "#000",
    textDecoration: "none",
    fontSize: "16px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#ccc",
    borderRadius: "4px",
    padding: "8px 16px",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    display: "inline-block",
    transition: "all 0.3s ease",
  },
  navButtonHover: {
    backgroundColor: "#f0f0f0",
    borderColor: "#888",
    transform: "scale(1.05)",
  },
  signOutLink: {
    color: "red",
    fontWeight: "bold",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "red",
    backgroundColor: "#ffffff",
  },
  hamburgerMenu: {
    color: "black",
    cursor: "pointer",
    fontSize: "28px",
    display: "none",
  },
  mobileMenu: {
    backgroundColor: "#c52726",
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
    zIndex: 999,
  },
  hamburgerCross: {
    color: "white",
    cursor: "pointer",
    fontSize: "40px",
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  mobileNavList: {
    listStyle: "none",
    textAlign: "center",
    padding: 0,
    margin: 0,
  },
  mobileNavItem: {
    margin: "15px 0",
    padding: "10px 0",
    position: "relative",
  },
  mobileNavLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "24px",
    transition: "color 0.3s ease",
  },
  mobileSignOutLink: {
    color: "red",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "red",
    fontWeight: "bold",
    backgroundColor: "transparent",
    padding: "8px 16px",
    borderRadius: "4px",
  },
  mobileNavButtonHover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "#ff4d4d",
    transform: "scale(1.05)",
  },
};

// Media Queries for Responsive Design
const mediaQueryStyles = `
  @media (max-width: 770px) {
    #hamburger-menu {
      display: block !important;
    }
    .nav-items {
      display: none;
    }
  }
`;


export default SuperAdminNavbar;
