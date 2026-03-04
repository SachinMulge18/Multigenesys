
import { Box, AppBar, Toolbar, Typography, Container, useScrollTrigger } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const AppLayout = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        elevation={trigger ? 2 : 0}
        sx={{
          bgcolor: trigger ? 'background.paper' : 'transparent',
          borderBottom: trigger ? '1px solid' : 'none',
          borderColor: 'divider',
          transition: 'all 0.2s',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', flex: 1 }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PeopleAltOutlinedIcon sx={{ color: '#fff', fontSize: 18 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'DM Serif Display', serif",
                color: 'text.primary',
                letterSpacing: '-0.01em',
                fontWeight: 400,
              }}
            >
              MultiGenesys
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              onClick={() => navigate('/employees')}
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: 1,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: location.pathname === '/employees' ? 600 : 400,
                color: location.pathname === '/employees' ? 'primary.main' : 'text.secondary',
                bgcolor: location.pathname === '/employees' ? 'primary.main' + '14' : 'transparent',
                transition: 'all 0.15s',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              Employees
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{fontStyle:"capitalize"}}>
          Multigenesys Software Pvt Ltd — Employee Directory
        </Typography>
      </Box>
    </Box>
  );
}

export default AppLayout
