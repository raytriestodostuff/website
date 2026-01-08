export type Project = {
  slug: string
  title: string
  status: string
  focus: string
  summary: string
  description: string
  highlights: string[]
  tools: string[]
  tags: string[]
  featured: boolean
  images?: {
    src: string
    caption: string
  }[]
}

export const projects: Project[] = [
  {
    slug: 'benchtop-static-light-scattering',
    title: 'Benchtop Static Light Scattering',
    status: 'Prototype',
    focus: 'Optical biosensing, scattering analysis, low-cost instrumentation',
    summary: 'Low-cost optical setup to perform static light scattering experiments.',
    description:
      'The project proposes the novel design of apparatus designed to perform static light scattering on biological samples. The AS7431 spectral sensor was used to capture the intensity of scattered, wavelength-specific light. The SLS module was evaluated by analysing saliva samples from 7 participants, 5 male and 2 female under resting and active conditions. Using the small-angle scattering intensities acquired across different angles, data fitting was performed using a linearised Guinier approximation to attain Rg and R^2 (coefficient of determination). This was used to assess the fit. The estimated Rg values derived from the device are well within the expected range of salivary mucins, as reported by [Kesimer M, Sheehan JK et al].\n\n\nBuilt alongside: Michaela Lastovickova (mpzh0862@leeds.ac.uk).',
    highlights: [
      'Designed a low-cost benchtop SLS apparatus for biological samples.',
      'Captured wavelength-specific scattering with the AS7431 spectral sensor.',
      'Applied Guinier fits to estimate Rg and assess model fit.',
    ],
    tools: [
      '3D printing',
      'Optical lenses',
      'Laser diode',
      'Photodiodes',
      'Variable LEDs',
      'Optical mounts',
      'Apertures and collimators',
    ],
    tags: ['Biomedical', 'Optics'],
    featured: true,
    images: [
      { src: '/images/sls-schematic.png', caption: 'Schematic and proposed design' },
      { src: '/images/sls-2.jpg', caption: 'Basic testing setup' },
      { src: '/images/sls-3.png', caption: 'Results' },
    ],
  },
  {
    slug: 'gpr-spectral-reconstruction',
    title: 'GPR Spectral Reconstruction',
    status: 'Prototype',
    focus: 'Spectral sensing, Gaussian processes, real-time visualization',
    summary: 'Machine-learning method to infer a continuous spectrum from AS7341 band data.',
    description:
      'The AS7341 provides a limited number of discrete spectral bands, so a Gaussian Process Regression (GPR) model was built to infer a continuous spectrum from the 8-channel input over serial. The input vector was mapped to wavelength positions and reshaped for training, using a combined kernel to interpolate between points.\n\nThe model predicts intensity values at 1 nm intervals between 415 nm and 680 nm, then re-inserts known sensor values to preserve ground-truth points. Live visualization in Matplotlib shows both predicted and measured values, with CSV export for logging. Validation used liquid food dyes (0.15 ml in a water cuvette) and qualitative comparison against expected absorbance.',
    highlights: [
      'GPR-based spectral reconstruction at 1 nm resolution',
      'Live visualization with CSV logging for captured runs',
      'Validation using dye samples and basic colorimetry',
    ],
    tools: [
      'Python',
      'Gaussian process regression',
      'AS7341 spectral sensor',
      'Serial communication',
      'Matplotlib',
      'CSV export',
    ],
    tags: ['Biomedical', 'AI'],
    featured: true,
    images: [{ src: '/images/gpr-dye-test-1.png', caption: 'GPR dye test 1' }],
  },
  {
    slug: 'dual-motor-driver-board',
    title: 'Dual Motor Driver Board',
    status: 'Prototype',
    focus: 'PCB design, motor control, power electronics',
    summary: 'Compact 30V dual DC motor driver PCB based on the A495 dual full-bridge IC.',
    description:
      'Designed a simple DC motor driver in Altium Designer to run from a 30V input and drive two independent motors at ~1A each. The design follows Altium\'s educational reference with changes for general use, a compact footprint, and full SMD assembly intended for reflow. Logical inputs via 2.54 mm headers and PWM control handle direction, braking, and low-power modes.\n\nThe board is powered by the A495 dual full-bridge driver (up to 40V, 2A peak) and uses recommended bulk and decoupling capacitors plus 0.25 ohm sense resistors. Input protection uses 33 ohm series resistors, while VREF trimmer potentiometers set current per motor. Motor outputs include capacitors and TVS diodes to suppress ESD and flyback transients.',
    highlights: [
      '30V dual-motor driver with compact SMD layout',
      'A495-based full-bridge control with PWM direction and braking',
      'Protection and filtering for reliable motor operation',
    ],
    tools: [
      'Altium Designer',
      'A495 dual full-bridge driver',
      'SMD reflow assembly',
      'PWM control',
      '2.54 mm header I/O',
    ],
    tags: ['Electronics', 'Motor control'],
    featured: true,
    images: [
      { src: '/images/motor-driver-schematic.png', caption: 'Schematic' },
      { src: '/images/motor-driver-layout.png', caption: 'PCB layout' },
      { src: '/images/motor-driver-routing.png', caption: 'Routing detail' },
      { src: '/images/motor-driver-3d-model.png', caption: '3D model' },
    ],
  },
  {
    slug: 'photobiomodulation-flex-cap',
    title: 'Phototherapy Flex Cap',
    status: 'Prototype',
    focus: 'Flex PCB design, photobiomodulation, wearable electronics',
    summary: 'Flex PCB cap for red and NIR light therapy using multiplexed LED control.',
    description:
      'Designed a flex PCB in Altium Designer for red and NIR light therapy aimed at hair regrowth. The goal is to deliver consistent, low-level light to the scalp, a technique often described as photobiomodulation. The layout uses dense 0603 red and NIR LEDs arranged for even coverage, with multiplexing that cycles power between LED groups so the overall dose stays uniform while heat and current are kept manageable. Two level shifters coordinate the timing signals that drive those LED groups.\n\nThe current prototype uses an external MCU and through-hole wiring to drive the cap, which makes the mechanical connections fragile. A future revision should integrate the MCU directly on the flex, reinforce the interconnects, and replace through-hole wiring with soldered pads or strain-relieved connectors for better durability and control.',
    highlights: [
      'Flex PCB layout in Altium for a wearable light-therapy cap',
      '0603 red and NIR LEDs with multiplexed control',
      'Level shifting for pulse control across LED banks',
    ],
    tools: ['Altium Designer', 'Flex PCB layout', '0603 LEDs', 'Level shifters', 'Multiplexing'],
    tags: ['Biomedical', 'Wearables'],
    featured: true,
    images: [
      { src: '/images/cap-full-system.jpg', caption: 'Full system' },
      { src: '/images/cap-lights-on.jpg', caption: 'Lights on' },
      { src: '/images/cap-uv-on.jpg', caption: 'NIR channel active' },
    ],
  },
  {
    slug: 'multiplexed-macropad',
    title: 'Multiplexed Macropad',
    status: 'Prototype',
    focus: 'Custom input device, PCB design, HID firmware',
    summary: '3x3 macropad built around a Pro Micro with multiplexed keys.',
    description:
      'Designed a simple 3x3 macropad using Cherry MX switches and a multiplexed diode matrix. The PCB mounts to a plate with 3D-printed keycaps and uses an Arduino Pro Micro for control.\n\nFirmware is minimal but functional: the device identifies as USB HID and sends key events over serial rather than running a full keyboard OS like QMK. Future revisions should integrate the MCU on-board, add encoders and analog inputs, improve mechanical robustness, and move to QMK or a wireless stack.',
    highlights: [
      '3x3 Cherry MX matrix with diode multiplexing',
      'Arduino Pro Micro control with USB HID output',
      '3D-printed keycaps and plate mounting',
    ],
    tools: ['PCB design', 'Cherry MX switches', 'Diode matrix', 'Arduino Pro Micro', '3D printing'],
    tags: ['HID', 'PCB'],
    featured: false,
    images: [
      { src: '/images/macropad-1.jpg', caption: 'Assembled macropad' },
      { src: '/images/macropad-2.jpg', caption: 'PCB and switch layout' },
      { src: '/images/macropad-3.jpg', caption: 'Keycap and plate fit' },
    ],
  },
  {
    slug: 'adaptive-eeg-actuators',
    title: 'Adaptive EEG Actuators',
    status: 'Prototype',
    focus: 'Soft robotics, pneumatics, EEG hardware',
    summary: 'Soft actuators for adaptive EEG electrode positioning using pneumatic control.',
    description:
      'Designed soft actuators that sit above BCI electrodes to enable adaptive EEG recordings, with the goal of minimizing noise from small head movements. The actuators are driven by a pneumatic system with two valves for inflation, deflation, and holding pressure, allowing controlled electrode positioning.\n\nThe parts were cast in 3D-printed molds using Ecoflex 30 and bonded with silicone glue to maintain a through-hole shape. Version 1 expanded too broadly and became unstable, so it was replaced by a bellows-shaped version 2 that provides more linear motion and better reliability. The bellows grooves also act as channels for cable routing.',
    highlights: [
      'Pneumatic actuation for adaptive EEG electrode positioning',
      'Ecoflex 30 casting with 3D-printed molds and silicone bonding',
      'Bellow-shaped V2 improved linear motion and stability',
    ],
    tools: ['Ecoflex 30', '3D-printed molds', 'Pneumatic valves', 'Silicone bonding'],
    tags: ['Robotics', 'Biomedical'],
    featured: false,
    images: [
      { src: '/images/actuator-poster.jpg', caption: 'Poster' },
      { src: '/images/actuator-v1.jpg', caption: 'Version 1' },
      { src: '/images/actuator-v2-default.jpg', caption: 'Version 2 (default)' },
      { src: '/images/actuator-v2.jpg', caption: 'Version 2 (actuated)' },
    ],
  },
  {
    slug: 'two-link-revolute-robot',
    title: 'Two-Link Revolute Robot',
    status: 'Prototype',
    focus: 'Robotics, rapid fabrication, PID control',
    summary: 'Fast-to-print two-link arm controlled with MATLAB PID loops.',
    description:
      'Built a simple two-link revolute robot with a focus on rapid fabrication. Each printed part was designed to take under 20 minutes to manufacture, enabling fast iteration and assembly. The arm was driven by a TI microcontroller and controlled through MATLAB-based PID tuning.\n\nThe build emphasizes quick mechanical iteration paired with stable control, making it a compact testbed for motion control experiments.',
    highlights: [
      'Two revolute joints with rapid 3D-printed parts',
      'MATLAB-based PID control for tuning and response testing',
      'TI MCU control for real-time actuation',
    ],
    tools: ['MATLAB', 'PID control', 'TI microcontroller', '3D printing'],
    tags: ['Robotics', 'Control'],
    featured: false,
    images: [
      { src: '/images/revolute-2link-model.jpg', caption: 'Model view' },
      { src: '/images/revolute-2link-1.jpg', caption: 'Assembled build' },
      { src: '/images/revolute-2link-2.jpg', caption: 'Joint detail' },
    ],
  },
  {
    slug: 'pursuit-dynamics-simulator',
    title: 'Pursuit Dynamics Simulator',
    status: 'Simulator',
    focus: 'Visual simulation, pursuit logic, behavior testing',
    summary: 'A 3D pursuit model that visualizes how a chaser adapts to a moving target over time.',
    description:
      'A lightweight 3D simulator that steps through time and renders a chaser and a moving target. The target spawns in the air with a randomized direction and subtle turning noise, while the chaser updates its heading using a lead-pursuit aim point and acceleration limits.\n\nEach run ends on interception or when the target hits the ground, then resets with a new target path to compare outcomes. Parameters like speed, max acceleration, and hit radius can be tuned to explore different behaviors.',
    highlights: [
      'Randomized target segments with smooth turning noise',
      'Lead-pursuit aiming with acceleration and speed caps',
      'Automatic reset on intercept or ground impact',
    ],
    tools: ['Python', 'NumPy', 'Matplotlib', 'FuncAnimation', 'Vector math'],
    tags: ['Simulation', 'Dynamics'],
    featured: true,
    images: [
      { src: '/images/chase-1.png', caption: 'Test #1' },
      { src: '/images/chase-2.png', caption: 'Test #2' },
      { src: '/images/chase-3.png', caption: 'Test #3' },
    ],
  },
]
