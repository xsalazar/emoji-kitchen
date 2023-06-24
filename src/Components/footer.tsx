import { Box, Link, Stack, Tooltip } from "@mui/material";
import {
  FileCodeIcon,
  LinkExternalIcon,
  MentionIcon,
} from "@primer/octicons-react";
import React from "react";

export default class Footer extends React.Component {
  render() {
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
}
