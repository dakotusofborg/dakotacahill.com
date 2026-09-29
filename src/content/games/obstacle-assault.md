---
title: Obstacle Assault
tagline: A third-person obstacle course of moving platforms and spinning hazards, built in Unreal Engine 5.6 with C++.
description: Third-person obstacle course in Unreal Engine 5.6 and C++. Moving and rotating platforms driven by a reusable C++ actor with designer-tunable velocity, distance, and rotation.
status: course-project
credit:
  name: GameDev.tv Unreal Engine C++ Developer
  url: https://www.gamedev.tv/
releaseDate: 2026-09-29
featured: true
order: 1

engine: Unreal Engine
engineVersion: '5.6'
platforms: [Windows]
genres: [Platformer, Obstacle Course]
role: 'Solo: C++ gameplay, level design'
teamSize: 1
tech: [C++, Unreal Engine 5.6, Enhanced Input, Blueprints, Git LFS]
highlights:
  - 'AMovingPlatform: a reusable C++ actor that moves back and forth and rotates, with velocity, travel distance, and rotation speed exposed to the editor via UPROPERTY'
  - Overshoot correction so platforms reverse at exactly their travel distance instead of drifting over time
  - Frame-rate-independent movement using DeltaTime
  - Level built from those C++ platforms, configured per instance through Blueprint subclasses

cover: ../../assets/games/obstacle-assault/cover.png
screenshots:
  - src: ../../assets/games/obstacle-assault/shot-village.png
    alt: Player standing on a stack of cinder blocks below a floating plank, with a village temple behind
  - src: ../../assets/games/obstacle-assault/shot-platform.png
    alt: Player on a wooden pallet platform looking toward a moving beam and a thatched barn

download:
  url: https://github.com/dakotusofborg/ObstacleAssault/releases/download/v0.1.0/ObstacleAssault-v0.1.0-Win64.zip
  version: 0.1.0
  sizeMB: 1203
  platform: Windows x64
  host: github
  notes: 'Unzip and run ObstacleAssault.exe. If SmartScreen warns, choose More info → Run anyway (the build is not code-signed).'

links:
  source: https://github.com/dakotusofborg/ObstacleAssault
---

## Overview

Obstacle Assault is a third-person obstacle course. You work your way across floating pallets, beams, and platforms that
slide and spin.

I built it following the GameDev.tv Unreal Engine C++ course. It's where I learned how Unreal's C++ side fits
together: actors, the tick lifecycle, the reflection system, and handing C++ values to the editor for tuning.

## The moving platform

Everything that moves in the level is one C++ class, `AMovingPlatform`. Each instance is configured in the editor with a
velocity, a travel distance, and a rotation speed. The movement logic, with logging trimmed:

```cpp
void AMovingPlatform::MovePlatform(float DeltaTime)
{
    DistanceMoved = GetDistanceMoved();

    if (DistanceMoved >= MoveDistance)
    {
        // Snap to the exact endpoint before reversing, so small per-frame
        // overshoots don't accumulate into drift over time.
        FVector MoveDirection = PlatformVelocity.GetSafeNormal();
        FVector NewStartLocation = StartLocation + MoveDirection * MoveDistance;
        SetActorLocation(NewStartLocation);
        StartLocation = NewStartLocation;

        PlatformVelocity = -PlatformVelocity;
    }
    else
    {
        SetActorLocation(GetActorLocation() + PlatformVelocity * DeltaTime);
    }
}
```

The simple version, "reverse when you've gone far enough", drifts, because a platform always overshoots by a frame's
worth of movement. Snapping to the exact endpoint before reversing keeps every platform on its path, however
long the level runs.

## What's next

This is v0.1. I'm planning to keep building on it with:

- Music and sound effects
- New mechanics beyond moving and rotating platforms
- More levels
