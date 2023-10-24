import React, { useEffect, useMemo } from 'react'
import { setSaves } from '../service/weatherSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack } from '@mui/material'
import SavedItems from '../components/SaveItems'

const Saves = () => {

  return (
    <Box >
      <Stack>
        <SavedItems />
      </Stack>
    </Box>
  )
}

export default Saves
