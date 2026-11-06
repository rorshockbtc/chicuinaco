# Workshop.pink Context Prompt for Project Analysis

## Project Overview

I am building **Workshop.pink** - a constitutional governance system for AI-assisted development that prevents the architectural chaos, dependency hell, and deployment disasters that plague current AI development tools.

## The Core Problem

Current AI agents (including Replit agents) make architectural decisions without constitutional constraints, then abandon users when those decisions create:
- Unexplained dependency chains
- 10+ hour deployment failures  
- API integration failures with "a lot of dependencies" 
- Inconsistent architecture across multi-app ecosystems
- Production pipeline failures

## Workshop.pink Solution

**"LegalZoom for App Architecture"** - A pattern library with constitutional governance that provides:
- Vetted, configurable boilerplate for 90-99% of common app features
- Constitutional constraints preventing bad architectural decisions
- 3k-15k word "Primers" with embedded governance rules
- Multi-app ecosystem consistency (SSO gateway patterns)
- Dependency governance (justified, documented API choices only)

## My Ecosystem Context

I'm building a multi-app ecosystem:
- **CHB Corporate**: SSO gateway/brand site 
- **Hurón**: LatAm real estate discovery platform (two-sided marketplace)
- **Honeybadger.pink**: Bitcoin education/research platform (data-intensive, API-heavy)

## What I Need From You

Please analyze this current project and provide a comprehensive `.md` file containing:

### 1. Architectural Analysis
- Current dependencies and their justifications
- API integrations and fallback strategies  
- Database design and relationship patterns
- Authentication/authorization patterns
- Deployment pipeline and production setup

### 2. Failure Documentation
- Any deployment issues or time-consuming problems encountered
- Dependency conflicts or unexplained package installations
- API integration failures or performance issues
- Architecture decisions that caused problems later
- Production vs development environment discrepancies

### 3. Pattern Identification  
- Reusable architectural patterns this project demonstrates
- Common app features this project implements (auth, payments, content management, etc.)
- Business logic patterns that could be templated
- UI/UX patterns that work well
- Integration patterns for external services

### 4. Constitutional Governance Recommendations
Based on this project's experience, what governance rules would have prevented problems?
- Dependency limits (max number, justification requirements)
- API integration constraints (timeouts, fallbacks, error handling)
- Deployment validation rules
- Performance requirements
- Security/authentication standards

### 5. Workshop.pink Integration Opportunities
- How could this project benefit from constitutional governance?
- What patterns from this project should be added to Workshop's pattern library?
- What governance constraints would improve this project's reliability?
- How would this project integrate with the CHB ecosystem SSO gateway?

## Technical Context

**My Expertise**: Material Design, admin tools, user auth, roles/permissions matrices, multi-app ecosystems, financial systems, real estate platforms

**Workshop Tech Stack**: React/TypeScript, Tailwind CSS, Express.js, constitutional governance middleware, heavy server-side compute for primer generation

**Target Timeline**: 4-6 week PoC focusing on pattern library with constitutional constraints

## Output Format

Please structure your analysis as a comprehensive markdown file with clear sections, code examples where relevant, and specific recommendations. Focus on concrete, actionable insights rather than general observations.

Include specific examples of:
- Code patterns that work well
- Architecture decisions that caused problems  
- Dependencies that were unnecessary or problematic
- Integration strategies that succeeded or failed
- Governance rules that would have prevented issues

This analysis will directly inform the Workshop.pink pattern library and constitutional governance system.