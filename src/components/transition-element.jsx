import * as React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MotionDivStyled = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export const TransitionElement = ({ children }) => (
  <MotionDivStyled
    initial={{ translateY: 10, opacity: 0.5 }}
    animate={{ translateY: 0, opacity: 1 }}
    transition={{
      when: 'beforeChildren',
      staggerChildren: 0.1
    }}
  >
    {children}
  </MotionDivStyled>
);
