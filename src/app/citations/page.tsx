'use client'

import LandingContent from "../components/landingContent";
import React from 'react';
import JobBlock from "../components/jobBlock";
import useMeasure from "react-use-measure";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { animate, useMotionValue } from "framer-motion";
import { useState } from "react";
import Carousel from '../components/Carousel';

const Citations = () => {

  return (
    <main>
      <LandingContent heading="Citations" subheading="Testing ticker/carousel" />
      
    </main>
  );
};

export default Citations;
