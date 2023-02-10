"use client"

import { AppButtonIcon, AppText, AppIcon } from '@/components/base'
import Link from 'next/link'
import styled from 'styled-components'
// import styled from "@emotion/styled";

export const containerGeral = `
  transition: all 0.2s ease-in;
`
export const containerResponsive = `
  padding: 0.5rem 0.75rem;

  @media (min-width: 426px) {
    margin-left: 2.25rem;
  }
  @media (min-width: 768px) {
    margin-bottom: 0.75rem;
    margin-left: 8rem;
    padding: 0.75rem;
  }
  @media (min-width: 1200px) {
    padding: 1rem 0.75rem;
    margin-left: calc(13rem + 0.5rem);
  } 
`

// LAYOUT
export const Container = styled.div`
  min-height: 100vh;
  padding: 0.25rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 0.5rem;
    min-height: 100vh;
  }
`

// MENU | Desktop
export const MenuDesktopContainer = styled.div`
  background: white;
  box-shadow: 4px 0 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 2.25rem;
  padding: 0.75rem 0.25rem;

  @media (min-width: 768px) {
    width: 8rem;
    padding: 1rem 0..25rem
  }
  @media (min-width: 1200px) {
    width: 13rem;
    padding: 0.75rem 0.75rem
  } 

  ${containerGeral}
`
export const MenuDesktopWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
export const MenuDesktopBrand = styled(AppText)`
  text-align: center;
  margin-bottom: 0.5rem !important;
  cursor: pointer;
  @media (min-width: 426px) and ( max-width: 768px) {
    margin-top: 4px !important;
    font-size: 1.125rem !important;
  }
`
export const MenuDesktopFooter = styled.div`
  border-top: 1px solid #bdbdbd;
  margin-top: auto;
  padding-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.25rem;

  @media (max-width: 768px) {
      flex-wrap: wrap;
  }
  @media (min-width: 425px) {
      justify-content: center;
  }
`
export const MenuDesktopFooterItem = styled(Link)`
  width: 100%;
  min-height: 2rem;
  display: flex; 
  color: #757575;
  background: linear-gradient(0deg, #eeeeee, #fafafa);
  text-decoration: none;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
      color: #212121;
      background: #e0e0e0;
  }
`
export const MenuDesktopFooterItemIcon = styled(AppIcon)`
  margin: auto;
  font-size: 1rem;
`
export const MenuDesktopLinkContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`
export const MenuDesktopLinkSection = styled.li`
  width: 100%;
`
export const MenuDesktopLinkTitle = styled(AppText)`
  display: none;
  width: 100%;
  font-size: 0.85rem !important;
  padding: 0.25rem 0.25rem;

  @media (min-width: 768px) {
    font-size: 1rem !important;
    display: block;
  }
`
export const MenuDesktopLinkItem = styled(Link)`
  transition: all 0.2s ease-in-out;
  min-height: 2rem;
  display: flex; 
  align-items: center;
  gap: 0.5rem;
  border-top: 1px solid #bdbdbd;
  color: #757575;
  text-decoration: none;
  cursor: pointer;

  /* &:hover,
  &.active {
      color: #212121;
  }
  &:hover {
      background: #e0e0e0;
  }
  &.active{
    background: linear-gradient(0deg, #eeeeee, #fafafa);

    @media (max-width: 426px) or (min-width: 768px) {
        padding-left: 0.75rem;
    }
  }    
  @media (min-width: 426px) {
    justify-content: center;
    padding: 0.5rem 0;
  }
  @media (min-width: 768px) {
    padding: 0.25rem;
  } */
`
export const MenuDesktopLinkIcon = styled(AppIcon)`
  width: 28px;
  font-size: 1.25rem;
  @media (min-width: 426px) {
    font-size: 1rem;
  }
  @media (min-width: 768px) {
    font-size: 0.85rem;
  }
  @media (min-width: 1200px) {
    font-size: 1rem;
  } 
`
export const MenuDesktopLinkText = styled(AppText)`
  line-height: 1 !important;
  font-size: 0.75rem !important;
  display: none;
  width: 100%;

  @media (min-width: 768px) {
    display: block;
  }
`

// MENU | mobile
export const MenuMobileContainer = styled.div`
  display: none;
`

// MAIN
export const MainContainer = styled.div`
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.02), 0 2px 4px -2px rgb(0 0 0 / 0.02);
  height: 100%;
  
  ${containerResponsive}
  ${containerGeral}
`