import { colors } from "@/styles/colors";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ForwardedRef, forwardRef, ReactNode, Ref, useCallback } from "react";

interface BottomSheetProps {
  children: ReactNode;
  ref: Ref<BottomSheet> | undefined;
}

const BottomSheetComponent = forwardRef<BottomSheet, BottomSheetProps>(
  function BottomSheetComponent({ children }, ref: ForwardedRef<BottomSheet>) {
    const renderBackDrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
        backdropComponent={renderBackDrop}
        backgroundStyle={{ backgroundColor: colors.gray[800] }}
        handleIndicatorStyle={{ backgroundColor: colors.gray[400] }}
      >
        <BottomSheetView style={{ flex: 1, alignItems: "center", padding: 16 }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export { BottomSheetComponent };
