import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';


function ResponsiveAppBar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isLoggedInJs = localStorage.getItem('isLoggedInJs') === 'true';
  const isLoggedInJo = localStorage.getItem('isLoggedInJo') === 'true';

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || localStorage.getItem('username') || '');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const JobSeekerSignInHandler = () => {
    navigate('/JobSeekerSignIn');
  };

  const JobSeekerSignUpHandler = () => {
    navigate('/JobSeekerSignUp');
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedInJs');
    localStorage.removeItem('isLoggedInJo');
    setUsername('');
    navigate('/', { replace: true });
  };

  const jobSeekPostingHandler = () => {
    navigate('/JobSeekPosting');
  };

  const jobOfferPostingHandler = () => {
    navigate('/JobOfferPosting');
  };

  const newComerPostingHandler = () => {
    navigate('/NewComerPosting');
  };

  const JsMyPageHandler = () => {
    navigate('/JSMainpage');
  };

  const JoMyPageHandler = () => {
    navigate('/JoMainpage');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#F1EFEF',
        marginBottom: '4px',
        height:"150px"
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Noto Sans',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              TowerCrane
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: 'auto',
            }}
          >
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,marginTop:"20px",marginRight:"100px" }}>
                    <Avatar style={{width:"45px",height:"45px"}} alt={username} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>


                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={logoutHandler}>
                    <Typography textAlign="center">로그아웃</Typography>
                  </MenuItem>
                  {!isLoggedInJs ? (
                    <MenuItem onClick={JoMyPageHandler}>
                      <Typography textAlign="center">마이페이지</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={JsMyPageHandler}>
                      <Typography textAlign="center">마이페이지</Typography>
                    </MenuItem>
                  )}
                </Menu>
              </>
            ) : (

              <>
 <div style={{ marginTop: "30px", display: "flex", alignItems: "center" }}>
      <Button
        style={{ color: 'black', fontWeight: 700, marginRight: "10px" }}
        onClick={() => JobSeekerSignInHandler()}
      >
        로그인
      </Button>
      <Typography variant="h6" noWrap style={{ color: '#D8D9CF', marginRight: "10px"}}>ㅣ</Typography>
      <Button
        style={{ color: 'black', fontWeight: 700, marginRight: "10px" }}
        onClick={() => JobSeekerSignUpHandler()}
      >
        회원가입
      </Button>
    </div>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },marginTop:"20px",marginLeft:"50px"}}>
            <Button
              style={{ color: 'black', fontWeight: 700,marginRight:"30px" }}
              size="large"
              onClick={() => jobOfferPostingHandler()}
            >
              구인공고
            </Button>
            <Button
              style={{ color: 'black', fontWeight: 700,marginRight:"30px" }}
              size="large"
              onClick={() => jobSeekPostingHandler()}
            >
              구직공고
            </Button>
            <Button
              style={{ color: 'black', fontWeight: 700 }}
              size="large"
              onClick={() => newComerPostingHandler()}
            >
              신입채용
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;