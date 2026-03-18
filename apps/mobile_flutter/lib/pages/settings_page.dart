import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../theme/app_theme_scope.dart';
import '../widgets/accessibility/text_size_control.dart';
import '../widgets/accessibility/theme_selector.dart';
import '../widgets/navigation/header_voice_button.dart';
import '../widgets/ui/app_button.dart';
import '../widgets/ui/app_card.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  bool readAloud = false;
  bool voiceCommands = false;
  bool voiceReminders = false;

  bool reduceMotion = false;
  bool enhancedFocus = true;
  bool largeTouchTargets = true;
  bool screenReaderSupport = false;

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    if (!mounted) return;

    setState(() {
      readAloud = prefs.getBool('careconnect-read-aloud') ?? false;
      voiceCommands = prefs.getBool('careconnect-voice-commands') ?? false;
      voiceReminders = prefs.getBool('careconnect-voice-reminders') ?? false;
      reduceMotion = prefs.getBool('careconnect-reduce-motion') ?? false;
      enhancedFocus = prefs.getBool('careconnect-enhanced-focus') ?? true;
      largeTouchTargets = prefs.getBool('careconnect-large-touch') ?? true;
      screenReaderSupport = prefs.getBool('careconnect-screen-reader') ?? false;
    });
  }

  Future<void> _saveSetting(String key, bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(key, value);
  }

  Future<void> _confirmReset() async {
    final ok = await showDialog<bool>(
      context: context,
      barrierDismissible: true,
      builder: (dialogContext) => _ResetDialog(
        onCancel: () => Navigator.of(dialogContext).pop(false),
        onConfirm: () => Navigator.of(dialogContext).pop(true),
      ),
    );

    if (ok == true) {
      await _handleResetAllSettings();
    }
  }

  Future<void> _handleBackNavigation() async {
    if (Navigator.of(context).canPop()) {
      context.pop();
      return;
    }

    final prefs = await SharedPreferences.getInstance();
    if (!mounted) return;

    final role = prefs.getString('careconnect-role');
    if (role == 'caregiver') {
      context.go('/caregiver/dashboard');
    } else if (role == 'patient') {
      context.go('/patient/dashboard');
    } else {
      context.go('/login');
    }
  }

  Future<void> _handleResetAllSettings() async {
    final prefs = await SharedPreferences.getInstance();

    await prefs.remove('careconnect-theme');
    await prefs.remove('careconnect-textsize');
    await prefs.remove('careconnect-read-aloud');
    await prefs.remove('careconnect-voice-commands');
    await prefs.remove('careconnect-voice-reminders');
    await prefs.remove('careconnect-reduce-motion');
    await prefs.remove('careconnect-enhanced-focus');
    await prefs.remove('careconnect-large-touch');
    await prefs.remove('careconnect-screen-reader');

    if (!mounted) return;
    final themeController = AppThemeScope.of(context);

    setState(() {
      readAloud = false;
      voiceCommands = false;
      voiceReminders = false;
      reduceMotion = false;
      enhancedFocus = true;
      largeTouchTargets = true;
      screenReaderSupport = false;
    });

    themeController.setEnhancedFocus(true);
    themeController.setLargeTouchTargets(true);
    themeController.setScreenReaderSupport(false);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Settings reset to defaults.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;
    final themeController = AppThemeScope.of(context);

    final sections = <_SettingsSection>[
      _SettingsSection(
        title: 'Account',
        headerIcon: Icons.person_outline,
        items: [
          _SettingsItem(
            label: 'Profile Information',
            leadingIcon: Icons.person,
            onTap: () => context.go('/profile'),
          ),
          _SettingsItem(
            label: 'Password & Security',
            leadingIcon: Icons.lock_outline,
            onTap: () {},
          ),
          _SettingsItem(
            label: 'Notifications',
            leadingIcon: Icons.notifications_none,
            onTap: () {},
          ),
        ],
      ),
      _SettingsSection(
        title: 'General',
        headerIcon: Icons.public,
        items: [
          _SettingsItem(
            label: 'Language & Region',
            leadingIcon: Icons.language,
            onTap: () {},
          ),
          _SettingsItem(
            label: 'Privacy Policy',
            leadingIcon: Icons.privacy_tip_outlined,
            onTap: () {},
          ),
          _SettingsItem(
            label: 'Help & Support',
            leadingIcon: Icons.help_outline,
            onTap: () {},
          ),
        ],
      ),
    ];

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            pinned: true,
            backgroundColor: cs.surface,
            surfaceTintColor: cs.surface,
            automaticallyImplyLeading: false,
            titleSpacing: 8,
            title: Row(
              children: [
                IconButton(
                  tooltip: 'Back',
                  onPressed: _handleBackNavigation,
                  icon: const Icon(Icons.arrow_back),
                ),
                const SizedBox(width: 6),
                Text(
                  'Settings',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const Spacer(),
                const Padding(
                  padding: EdgeInsets.only(right: 8),
                  child: HeaderVoiceButton(),
                ),
              ],
            ),
            bottom: PreferredSize(
              preferredSize: const Size.fromHeight(2),
              child: Container(height: 2, color: theme.dividerColor),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 96),
            sliver: SliverList(
              delegate: SliverChildListDelegate(
                [
                  Row(
                    children: [
                      Icon(
                        Icons.visibility_outlined,
                        size: 28,
                        color: cs.primary,
                      ),
                      const SizedBox(width: 10),
                      Text(
                        'Accessibility Preferences',
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const _SettingsPanel(
                    title: 'Vision Theme',
                    subtitle: 'Contrast and color settings',
                    leadingIcon: Icons.visibility_outlined,
                    child: ThemeSelector(),
                  ),
                  const SizedBox(height: 12),
                  const _SettingsPanel(
                    title: 'Text Size',
                    subtitle: 'Adjust font size',
                    leadingIcon: Icons.text_fields,
                    child: TextSizeControl(),
                  ),
                  const SizedBox(height: 12),
                  _SettingsPanel(
                    title: 'Voice Features',
                    subtitle: 'Read aloud and voice commands',
                    leadingIcon: Icons.mic_none,
                    child: Column(
                      children: [
                        _ToggleRow(
                          title: 'Read Aloud',
                          subtitle: 'Have the app read screens aloud',
                          value: readAloud,
                          onChanged: (value) {
                            setState(() => readAloud = value);
                            _saveSetting('careconnect-read-aloud', value);
                          },
                        ),
                        const SizedBox(height: 10),
                        _ToggleRow(
                          title: 'Voice Commands',
                          subtitle: 'Navigate and act using your voice',
                          value: voiceCommands,
                          onChanged: (value) {
                            setState(() => voiceCommands = value);
                            _saveSetting('careconnect-voice-commands', value);
                          },
                        ),
                        const SizedBox(height: 10),
                        _ToggleRow(
                          title: 'Voice Reminders',
                          subtitle: 'Play spoken reminders and alerts',
                          value: voiceReminders,
                          onChanged: (value) {
                            setState(() => voiceReminders = value);
                            _saveSetting('careconnect-voice-reminders', value);
                          },
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  _SettingsPanel(
                    title: 'Interface Options',
                    subtitle: 'Motion, touch, and focus',
                    leadingIcon: Icons.settings_outlined,
                    child: Column(
                      children: [
                        _ToggleRow(
                          title: 'Reduce Motion',
                          subtitle: 'Minimize animations',
                          value: reduceMotion,
                          onChanged: (value) {
                            setState(() => reduceMotion = value);
                            _saveSetting('careconnect-reduce-motion', value);
                          },
                        ),
                        const SizedBox(height: 10),
                        _ToggleRow(
                          title: 'Enhanced Focus Indicators',
                          subtitle: 'Stronger focus outlines',
                          value: enhancedFocus,
                          onChanged: (value) {
                            setState(() => enhancedFocus = value);
                            themeController.setEnhancedFocus(value);
                          },
                        ),
                        const SizedBox(height: 10),
                        _ToggleRow(
                          title: 'Large Touch Targets',
                          subtitle: 'Bigger buttons and controls',
                          value: largeTouchTargets,
                          onChanged: (value) {
                            setState(() => largeTouchTargets = value);
                            themeController.setLargeTouchTargets(value);
                          },
                        ),
                        const SizedBox(height: 10),
                        _ToggleRow(
                          title: 'Screen Reader Support',
                          subtitle: 'Optimize for assistive tech',
                          value: screenReaderSupport,
                          onChanged: (value) {
                            setState(() => screenReaderSupport = value);
                            themeController.setScreenReaderSupport(value);
                          },
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 22),
                  for (final section in sections) ...[
                    Row(
                      children: [
                        Icon(section.headerIcon, size: 28, color: cs.primary),
                        const SizedBox(width: 10),
                        Text(
                          section.title,
                          style: theme.textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    AppCard(
                      padding: EdgeInsets.zero,
                      child: Theme(
                        data: theme.copyWith(dividerColor: Colors.transparent),
                        child: ExpansionTile(
                          tilePadding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 6,
                          ),
                          childrenPadding: const EdgeInsets.only(bottom: 12),
                          leading: Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: cs.surfaceContainerHighest,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(
                                color: theme.dividerColor,
                                width: 2,
                              ),
                            ),
                            child: const Icon(Icons.description_outlined),
                          ),
                          title: Text(
                            '${section.title} Settings',
                            style: theme.textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                          subtitle: Text(
                            'Manage ${section.title.toLowerCase()} preferences',
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: theme.hintColor,
                            ),
                          ),
                          children: [
                            for (int i = 0; i < section.items.length; i++) ...[
                              if (i > 0)
                                Container(
                                  height: 2,
                                  color: theme.dividerColor,
                                ),
                              _NavRow(item: section.items[i]),
                            ],
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 22),
                  ],
                  AppCard(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        Text(
                          'CareConnect',
                          style: theme.textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          'Version 1.0.0',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.hintColor,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          '(c) 2025 CareConnect. All rights reserved.',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.hintColor,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 14),
                        AppButton(
                          variant: AppButtonVariant.secondary,
                          onPressed: _confirmReset,
                          icon: const Icon(Icons.refresh, size: 18),
                          child: const Text('Reset All Settings'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SettingsPanel extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData leadingIcon;
  final Widget child;

  const _SettingsPanel({
    required this.title,
    required this.subtitle,
    required this.leadingIcon,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return AppCard(
      padding: EdgeInsets.zero,
      child: Theme(
        data: theme.copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          tilePadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
          childrenPadding: const EdgeInsets.fromLTRB(14, 0, 14, 14),
          leading: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: cs.surfaceContainerHighest,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: theme.dividerColor, width: 2),
            ),
            child: Icon(leadingIcon, color: cs.onSurface),
          ),
          title: Text(
            title,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w900,
            ),
          ),
          subtitle: Text(
            subtitle,
            style: theme.textTheme.bodySmall?.copyWith(color: theme.hintColor),
          ),
          children: [child],
        ),
      ),
    );
  }
}

class _ToggleRow extends StatelessWidget {
  final String title;
  final String subtitle;
  final bool value;
  final ValueChanged<bool> onChanged;

  const _ToggleRow({
    required this.title,
    required this.subtitle,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: cs.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: theme.dividerColor, width: 2),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.hintColor,
                  ),
                ),
              ],
            ),
          ),
          Switch(
            value: value,
            activeThumbColor: cs.primary,
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }
}

class _NavRow extends StatelessWidget {
  final _SettingsItem item;

  const _NavRow({required this.item});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return InkWell(
      onTap: item.onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        child: Row(
          children: [
            Icon(item.leadingIcon, color: cs.onSurface),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                item.label,
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            Icon(Icons.chevron_right, color: theme.hintColor),
          ],
        ),
      ),
    );
  }
}

class _ResetDialog extends StatelessWidget {
  final VoidCallback onCancel;
  final VoidCallback onConfirm;

  const _ResetDialog({
    required this.onCancel,
    required this.onConfirm,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return AlertDialog(
      title: const Text('Reset All Settings?'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'This will reset all your preferences including theme, text size, and accessibility settings to their defaults.',
            style: theme.textTheme.bodyMedium?.copyWith(color: theme.hintColor),
          ),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFFEF5E7),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: const Color(0xFFF6C343),
                width: 2,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Safety Notice',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w900,
                    color: const Color(0xFF8A5A00),
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'You can always change these settings again after resetting.',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.hintColor,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      actions: [
        TextButton(onPressed: onCancel, child: const Text('Cancel')),
        ElevatedButton(
          onPressed: onConfirm,
          style: ElevatedButton.styleFrom(
            backgroundColor: cs.error,
            foregroundColor: Colors.white,
          ),
          child: const Text('Reset Settings'),
        ),
      ],
    );
  }
}

class _SettingsSection {
  final String title;
  final IconData headerIcon;
  final List<_SettingsItem> items;

  _SettingsSection({
    required this.title,
    required this.headerIcon,
    required this.items,
  });
}

class _SettingsItem {
  final String label;
  final IconData leadingIcon;
  final VoidCallback onTap;

  _SettingsItem({
    required this.label,
    required this.leadingIcon,
    required this.onTap,
  });
}
