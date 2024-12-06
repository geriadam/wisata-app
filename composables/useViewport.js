import { useViewport } from '#imports';
import { ref, computed, watch } from 'vue';

export function useViewportState() {
  const viewport = useViewport();

  const isMobile = ref(viewport.isLessThan('desktop') || viewport.isLessOrEquals('tablet'));
  const isDesktop = ref(viewport.isGreaterOrEquals('desktop'));

  // Reactive breakpoint for additional use
  const breakpoint = ref(viewport.breakpoint);

  watch(
    viewport.breakpoint,
    (newBreakpoint, oldBreakpoint) => {
      breakpoint.value = newBreakpoint;

      if (newBreakpoint == 'desktop' || newBreakpoint == 'desktopMedium' || newBreakpoint == 'desktopWide') {
        isDesktop.value = true;
        isMobile.value = false;
      }

      if (newBreakpoint == 'mobile' || newBreakpoint == 'mobileMedium' || newBreakpoint == 'mobileWide' || newBreakpoint == 'tablet') {
        isDesktop.value = false;
        isMobile.value = true;
      }
    },
    { immediate: true }
  );

  return {
    isMobile,
    isDesktop,
    breakpoint,
  };
}
