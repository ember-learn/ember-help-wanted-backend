#!/bin/bash

cd tmp
git clone https://github.com/denali-js/denali.git
cd denali
npm install
npm link
cd ..
npm link denali