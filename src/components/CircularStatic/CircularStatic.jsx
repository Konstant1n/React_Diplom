// import * as React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

// export default function CircularIndeterminate() {
//   return (
//     <Box sx={{ height: 'vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <CircularProgress />
//     </Box>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
}
