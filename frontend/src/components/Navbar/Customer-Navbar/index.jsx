import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { logout } from '../../../redux/authSlice';

const CustomerNavbar = () => {
  const { role } = useSelector(state => state.auth); // Fetching user role from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to Redux
    navigate('/login'); // Redirect user to login page after logout
  };

  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 770;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuVisible(false); // Hide mobile menu when switching to desktop
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

  return (
    <div>
      <nav style={styles.navbar}>
        <div style={styles.navLogo}>
          <Link to="/customer" style={styles.navLogoLink}>
            <b>Domestic RO Controller</b>
          </Link>
        </div>
        {!isMobile ? (
          <div style={styles.navItems}>
            <ul style={styles.navList}>
              {["Profile", "Live Data", "Recharge", "Transaction"].map(
                (item, index) => (
                  <li
                    style={styles.navListItem}
                    key={index}
                    onMouseEnter={() => setHoveredLink(item.toLowerCase())}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Link
                      to={`/customer/${item.toLowerCase().replace(" ", "")}`}
                      style={{
                        ...styles.navButton,
                        ...(hoveredLink === item.toLowerCase()
                          ? styles.navButtonHover
                          : {}),
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
              <li
                style={styles.navListItem}
                onMouseEnter={() => setHoveredLink("logout")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  style={{
                    ...styles.navButton,
                    ...styles.signOutLink,
                    ...(hoveredLink === "logout"
                      ? styles.navButtonHover
                      : {}),
                  }}
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div
            id="hamburger-menu"
            style={styles.hamburgerMenu}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") toggleMobileMenu();
            }}
          >
            &#9776;
          </div>
        )}
      </nav>

      {mobileMenuVisible && (
        <div id="mobile-menu" style={styles.mobileMenu}>
          <div
            id="hamburger-cross"
            style={styles.hamburgerCross}
            onClick={closeMobileMenu}
            aria-label="Close menu"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") closeMobileMenu();
            }}
          >
            &#10006;
          </div>
          <div style={styles.mobileNavItems}>
            <ul style={styles.mobileNavList}>
              {["Profile", "Live Data", "Recharge", "Transaction"].map(
                (item, index) => (
                  <li
                    style={styles.mobileNavItem}
                    key={index}
                    onMouseEnter={() => setHoveredLink(item.toLowerCase())}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Link
                      to={`/customer/${item.toLowerCase().replace(" ", "")}`}
                      style={{
                        ...styles.mobileNavLink,
                        ...styles.mobileButton,
                        ...(hoveredLink === item.toLowerCase()
                          ? styles.mobileNavButtonHover
                          : {}),
                      }}
                      onClick={closeMobileMenu}
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
              <li
                style={styles.mobileNavItem}
                onMouseEnter={() => setHoveredLink("logout")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  style={{
                    ...styles.mobileNavLink,
                    ...styles.mobileButton,
                    ...styles.mobileSignOutLink,
                    ...(hoveredLink === "logout"
                      ? styles.mobileNavButtonHover
                      : {}),
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
        </div>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    position: "fixed", // Fixed position
    top: 0,
    left: 0,
    width: "100%", // Full width
    display: "flex",
    padding: "10px 20px",
    backgroundColor: "#f7f7f7",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
    zIndex: 1000, // Ensure it stays above other elements
    boxSizing: "border-box",
  },
  navLogo: {},
  navLogoLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "24px",
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
    backgroundColor: "#e0e0e0",
    borderColor: "#888",
    transform: "scale(1.05)",
  },
  signOutLink: {
    color: "red",
    fontWeight: "bold",
    borderColor: "red",
    backgroundColor: "#ffffff",
  },
  hamburgerMenu: {
    color: "black",
    cursor: "pointer",
    fontSize: "28px",
    display: "block", // Always display based on isMobile state
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
    zIndex: 999, // Below the navbar
  },
  hamburgerCross: {
    color: "white",
    cursor: "pointer",
    fontSize: "40px",
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  mobileNavItems: {},
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
  mobileButton: {
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: "4px",
    padding: "10px 20px",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "inline-block",
    transition: "all 0.3s ease",
  },
  mobileSignOutLink: {
    color: "red",
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

export default CustomerNavbar;
