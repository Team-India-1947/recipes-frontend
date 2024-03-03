import { ReactNode } from "react";
import {
  InfiniteList,
  SimpleList,
  DateField,
  FilterLiveSearch,
  useListContext,
} from "react-admin";
import { Box } from "@mui/material";
import { useLocation, matchPath } from "react-router-dom";

import RecipeEdit from "./RecipeEdit";
import RecipeShowEmpty from "./RecipeShowEmpty";
import RecipeListEmpty from "./RecipeListEmpty";
import CreateRecipeButton from "./CreateRecipeButton";

interface ListContentProps {
  empty: ReactNode;
  notEmpty: ReactNode;
}

function shorten(str: string, maxLen: number = 30) {
  return str.length > maxLen ? str.slice(0, maxLen - 3) + "..." : str;
}

const resource = "recipes";

const EmptyTooltip = <></>;

const ListContent = ({ empty, notEmpty }: ListContentProps) => {
  const { isLoading, data, filterValues } = useListContext();
  return !isLoading &&
    data?.length === 0 &&
    (!filterValues || Object.keys(filterValues).length === 0)
    ? empty
    : notEmpty;
};

export default function RecipeList() {
  //   const redirect = useRedirect();
  const location = useLocation();
  const match = matchPath(`/${resource}/:id`, location.pathname);

  return (
    <Box display="flex" width="100%">
      <Box
        display="flex"
        gap={1}
        width="320px"
        height="100vh"
        flexDirection="column"
      >
        <Box m={1} border="solid 1px #ccc" width="100%">
          <CreateRecipeButton />
        </Box>

        <Box
          m={1}
          border="solid 1px #ccc"
          sx={{ overflowY: "auto" }}
          width="100%"
        >
          <InfiniteList
            actions={EmptyTooltip}
            resource={resource}
            empty={false}
            sort={{ field: "timestamp", order: "DESC" }}
            disableSyncWithLocation
            component="div"
          >
            <ListContent
              empty={<RecipeListEmpty />}
              notEmpty={
                <>
                  <FilterLiveSearch
                    fullWidth
                    variant={"standard" as any}
                    label="Search all compositions"
                    hiddenLabel
                    sx={{
                      px: 2,
                      "& .MuiInput-root:before": { display: "none" },
                      "& .MuiInput-root:after": { display: "none" },
                      "& .MuiSvgIcon-root": { fontSize: "1.25rem" },
                    }}
                  />
                  <SimpleList
                    primaryText="%{title}"
                    secondaryText={shorten("%{body}")}
                    tertiaryText={(record) => (
                      <DateField record={record} source="timestamp" />
                    )}
                    sx={{
                      py: 0,
                      "& .MuiListItemText-secondary": {
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: 268,
                      },
                    }}
                    rowSx={(record) =>
                      !!match &&
                      parseInt((match as any).params.id, 10) === record.id
                        ? { backgroundColor: "#eee" }
                        : null
                    }
                  />
                </>
              }
            />
          </InfiniteList>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap={1} flex={1}>
        {match ? (
          <RecipeEdit id={(match as any).params.id} />
        ) : (
          <RecipeShowEmpty />
        )}
      </Box>
    </Box>
  );
}
