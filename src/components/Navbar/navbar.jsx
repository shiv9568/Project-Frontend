import { useEffect, useState, useContext } from 'react';
import { AppBar, Toolbar, styled, Box, Drawer, IconButton, Menu, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/picture2.png';
import { UserContext } from '../context/userContext';
import './loginButton.css'; // Ensure this file has the styling for both buttons

const drawerWidth = 240;

const EditToolbar = styled(Toolbar)`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const ScrollTrack = styled(Box)`
    height: 3px;
    position: fixed;
    left: 0;
    width: 100%;
    transform-origin: left;
    scale: 0 1;
    background-color: white;
    animation: scroll-watch linear;
    animation-timeline: scroll();
    @keyframes scroll-watch {
        to {
            scale: 1 1;
        }
    }
    background: rgb(174, 58, 180);
    background: linear-gradient(90deg, rgba(174, 58, 180, 1) 0%, rgba(253, 64, 29, 1) 61%, rgba(252, 176, 69, 1) 100%);
`;

const NaviButton = styled(NavLink)`
    padding-top: 20px;
    padding-bottom: 20px;
    color: black;
    letter-spacing: 1px;
    font-size: 20px;
    font-weight: 500;
    text-decoration: none;
    text-align: center;
`;

const StyledMenu = styled((props) => <Menu {...props} />)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(0.5),
        minWidth: 140,
        width: 140,
    },
}));

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { user, isUser } = useContext(UserContext);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleProfileMenuOpen = (event) => {
        if (localStorage.getItem('role')) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };
        console.log('Role is here:', getCookie('role'));
    }, []);

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // Navigate to the Sign Up page
    };

    const BlogPage = () => {
        navigate('/blogs');
        handleMenuClose();
    };

    const logout = () => {
        localStorage.clear();
        handleMenuClose();
        navigate('/');
    };

    const menuId = 'primary-search-account-menu';

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AppBar
                    position="fixed"
                    className="backdrop-blur-[14px]"
                    
                    sx={{
                        width: '100%',
                        height: '65px',
                        margin: 0,
                        padding: 0,
                        backgroundColor: 'white',
                        backdropFilter: '14px',
                    }}
                >
                    <EditToolbar
                        position="fixed"
                        sx={{ height: { xs: '65px' }, backgroundColor: 'white' }}
                    >
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                display: { md: 'none' },
                                position: 'absolute',
                                left: '5vh',
                                scale: '1.4',
                            }}
                        >
                            <MenuIcon style={{ color: 'black', scale: '1.09' }} />
                        </IconButton>
                        <div className="w-[55%] hidden sm:flex justify-around">
                            {localStorage.getItem('role') && (
                                <>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `text-[25px] ${
                                                isActive ? 'text-orange-400 font-extrabold'  : 'text-black font-extrabold'
                                            }`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/events"
                                        className={({ isActive }) =>
                                            `text-[25px] ${
                                                isActive ? 'text-orange-400 font-extrabold'  : 'text-black font-extrabold'
                                            }`
                                        }
                                    >
                                        Event
                                    </NavLink>
                                    <NavLink
                                        to="/clubs"
                                        className={({ isActive }) =>
                                            `text-[25px] ${
                                               isActive ? 'text-orange-400 font-extrabold'  : 'text-black font-extrabold'
                                            }`
                                        }
                                    >
                                        Clubs
                                    </NavLink>
                                    {/* Conditionally render Profile link */}
                                    {localStorage.getItem('role') !== 'Head' && (
                                        <NavLink
                                            to="/profile"
                                            className={({ isActive }) =>
                                                `text-[25px] ${
                                                  isActive ? 'text-orange-400 font-extrabold'  : 'text-black font-extrabold'
                                                }`
                                            }
                                        >
                                            Profile
                                        </NavLink>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="flex gap-2 right-[25px] absolute top-[10px]">
                            {localStorage.getItem('role') ? (
                                <>
                                    <div
                                        onClick={handleProfileMenuOpen}
                                        className="flex gap-2 cursor-pointer"
                                    >
                                        <img
                                            className="w-[42px] h-[42px] shadow-2xl border-[0.5px] border-black relative top-[2px] rounded-full ring-gray-300 dark:ring-gray-500"
                                            src={
                                                user.image ||
                                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQLZBLliHC0oAh1vMfI7Z5IzTV8_RlzVeh6QqSzs_SCqn5a0rkuXEoVsuDPNxMntF0vc&usqp=CAU'
                                            }
                                            alt="User"
                                        />
                                        <p className="relative top-[10px] text-black font-medium hidden lg:block text-lg">
                                            {user.name}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleLoginClick}
                                        className="login tracking-wider"
                                    >
                                        LOGIN
                                    </button>
                                </>
                            )}
                        </div>
                    </EditToolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{
                        width: { sm: drawerWidth },
                        flexShrink: { sm: 0 },
                    }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                backgroundColor: '#e3e3e3',
                            },
                        }}
                    >
                        <Box
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: '30px',
                            }}
                        >
                            <NaviButton
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-orange-400'
                                        : 'text-white hover:text-[#00FF9C]'
                                }
                            >
                                Home
                            </NaviButton>
                        </Box>
                    </Drawer>
                </Box>
            </Box>
            <StyledMenu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <Button
                    onClick={logout}
                    style={{ width: '100%', color: 'black' }}
                    variant="text"
                >
                    Log Out
                </Button>
                <a href="/profile">
                    <Button
                        style={{ width: '100%', color: 'black' }}
                        variant="text"
                    >
                        Profile
                    </Button>
                </a>
            </StyledMenu>
            <ScrollTrack
                sx={{ top: { sm: '62px', xs: '61.8px' }, zIndex: '3' }}
            ></ScrollTrack>
        </>
    );
};

export default Navbar;