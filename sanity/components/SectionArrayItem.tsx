"use client";

import { useCallback } from "react";
import { Switch, Box, Flex, Text } from "@sanity/ui";
import { set, type ObjectItemProps, type ObjectItem } from "sanity";

type SectionItem = ObjectItem & {
  enabled?: boolean;
};

export function SectionArrayItem(props: ObjectItemProps) {
  const { value, renderDefault, inputProps } = props;
  const { onChange } = inputProps;

  const sectionValue = value as SectionItem | undefined;
  const isHeroSection = sectionValue?._type === "heroSection";
  const isEnabled = isHeroSection ? true : sectionValue?.enabled !== false;

  const handleToggle = useCallback(() => {
    if (isHeroSection) return;
    onChange(set(!isEnabled, ["enabled"]));
  }, [isEnabled, isHeroSection, onChange]);

  return (
    <Flex align="center" gap={2}>
      <Box style={{ opacity: isEnabled ? 1 : 0.5 }} flex={1}>
        {renderDefault(props)}
      </Box>
      <Box paddingRight={3}>
        <Flex align="center" gap={2}>
          {isHeroSection ? (
            <Text size={1} muted>
              Required
            </Text>
          ) : (
            <Switch
              checked={isEnabled}
              onChange={handleToggle}
              style={{ cursor: "pointer" }}
            />
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
