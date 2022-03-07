
import { Box } from "native-base"

export function Container({ children, ...props }) { return (<Box padding={3} marginY={3} {...props}>{children}</Box>) }