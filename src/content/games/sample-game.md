---
# ─── SAMPLE GAME ───────────────────────────────────────────────────────────
# Copy this file to add a game. The filename becomes the URL: /games/sample-game/
# Every field is validated by src/content.config.ts. Mistakes fail the build.
title: Project Echo
tagline: A third-person action prototype built around a sound-driven combat system.
description: Third-person action prototype in Unreal Engine 5 and C++, featuring a custom sound-reactive combat system built on the Gameplay Ability System.
status: prototype # released | in-development | prototype | game-jam
releaseDate: 2026-09-01
featured: true
showOnCV: false # sample content: never list on the real CV
order: 2

engine: Unreal Engine
engineVersion: '5.6'
platforms: [Windows]
genres: [Action, Third-Person]
role: 'Solo developer: programming, design'
teamSize: 1
duration: 3 months
tech: [C++, Gameplay Ability System, Enhanced Input, Niagara, Claude Code, MCP]
highlights:
  - Sound-reactive ability system in C++ on top of GAS
  - Custom AI perception sense that reacts to player noise
  - Data-driven weapon tuning via DataAssets

cover: ../../assets/games/sample-game/cover.png
screenshots:
  - src: ../../assets/games/sample-game/shot-1.png
    alt: Player using a sonic pulse ability on a group of enemies
  - src: ../../assets/games/sample-game/shot-2.png
    alt: Traversal through a ruined industrial area
# trailer: dQw4w9WgXcQ          # YouTube video ID
# clips:                         # short .mp4/.webm loops in /public/clips/
#   - src: /clips/echo-pulse.mp4
#     caption: Sonic pulse staggering enemies

download:
  url: https://github.com/your-username/project-echo/releases/latest
  version: 0.1.0
  sizeMB: 850
  platform: Windows x64
  host: github
  notes: Unzip and run ProjectEcho.exe. No install needed.

links:
  source: https://github.com/your-username/project-echo
  # projectFiles: https://github.com/your-username/project-echo/releases/download/v0.1.0/ProjectEcho-Source.zip
  # itch: https://your-username.itch.io/project-echo
---

## Overview

This is the long-form write-up for the game: the pitch, what makes it interesting, and what you learned. It's regular
Markdown, so you can include code:

```cpp
void UEchoPulseAbility::ActivateAbility(const FGameplayAbilitySpecHandle Handle,
    const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo,
    const FGameplayEventData* TriggerEventData)
{
    if (!CommitAbility(Handle, ActorInfo, ActivationInfo))
    {
        EndAbility(Handle, ActorInfo, ActivationInfo, true, true);
        return;
    }
    UAISense_Hearing::ReportNoiseEvent(GetWorld(), ActorInfo->AvatarActor->GetActorLocation(), Loudness, ActorInfo->AvatarActor.Get());
}
```

## Design goals

- Goal one
- Goal two

## Postmortem

What went right, what went wrong, and what you'd do differently.
