# Custom Domain Setup Guide

This guide explains how to connect a custom domain to your Keep Going Classes application hosted on the Internet Computer.

## Overview

Your application is currently accessible at:
- **Current URL**: `https://caffeine.icp0.io/app/keep-going-classes`

After setting up a custom domain, it will be accessible at your own domain (e.g., `https://keepgoingclasses.com`).

## Prerequisites

1. A registered domain name (e.g., `keepgoingclasses.com`)
2. Access to your domain's DNS settings
3. Your application's canister ID

## Step 1: Configure DNS Records

Add the following DNS records in your domain registrar's control panel:

### For Root Domain (e.g., keepgoingclasses.com)

Add a **CNAME** record:
- **Type**: CNAME
- **Name**: `@` (or leave blank for root domain)
- **Value**: `icp1.io`
- **TTL**: 3600 (or your registrar's default)

### For Subdomain (e.g., www.keepgoingclasses.com)

Add a **CNAME** record:
- **Type**: CNAME
- **Name**: `www`
- **Value**: `icp1.io`
- **TTL**: 3600 (or your registrar's default)

### Alternative: Using A Records

If your registrar doesn't support CNAME for root domains, use A records:
- **Type**: A
- **Name**: `@`
- **Value**: Check the latest ICP boundary node IP addresses at [internetcomputer.org](https://internetcomputer.org)

## Step 2: Register Custom Domain with Internet Computer

After DNS propagation (usually 15 minutes to 48 hours), you need to register your custom domain with the Internet Computer boundary nodes.

### Using dfx CLI:

