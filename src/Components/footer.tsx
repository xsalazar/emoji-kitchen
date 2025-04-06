import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  FileCodeIcon,
  LinkExternalIcon,
  MentionIcon,
} from "@primer/octicons-react";

export default function Footer() {
  return (
    <div>
      <Box component="footer" sx={{ py: 4 }}>
        <Stack spacing={4} direction="row" justifyContent="center">
          <Tooltip title="Contact Me">
            <Link
              href="https://xsalazar.com"
              color="textPrimary"
              aria-label="Contact Me"
              target="_blank"
              rel="noopener"
            >
              <MentionIcon size="small" verticalAlign="middle" />
            </Link>
          </Tooltip>
          <Tooltip title="Source Code">
            <Link
              href="https://github.com/xsalazar/emoji-kitchen"
              color="textPrimary"
              aria-label="Source Code"
              target="_blank"
              rel="noopener"
            >
              <FileCodeIcon size="small" verticalAlign="middle" />
            </Link>
          </Tooltip>
          <Tooltip title="Learn More">
            <Link
              href="https://www.emojipedia.org/emoji-kitchen/"
              color="textPrimary"
              aria-label="Learn More"
              target="_blank"
              rel="noopener"
            >
              <LinkExternalIcon size="small" verticalAlign="middle" />
            </Link>
          </Tooltip>
        </Stack>
      </Box>
    </div>
  );
}
