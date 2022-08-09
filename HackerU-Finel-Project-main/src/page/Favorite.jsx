import React from "react";
import {
  Badge,
  Button,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CardActions,
  IconButton,
} from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AddShoppingCart } from "@material-ui/icons";

export const Favorite = (props) => {
  const { FavoriteCart, handleRemoveButtonClick, handleBuyButtonClick } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (FavoriteCart.length !== 0) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const c = FavoriteCart.chosenSize;
  console.log(c);
  return (
    <>
      <Button
        style={{
          borderRadius: "33%",
          width: "5vw",
          height: "5vh",
        }}
        variant="contained"
        endIcon={
          <Badge badgeContent={FavoriteCart.length} color="primary">
            <FavoriteBorderIcon color="action" style={{ marginLeft: "-20%" }} />
          </Badge>
        }
        onClick={handleClick}
        sx={{ bgcolor: "gray.400" }}
      ></Button>
      <Popover
        id="shoppingCart"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
            <TableBody>
              {FavoriteCart.map((props, index, item) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      style={{
                        textAlign: "center",
                        width: "5vw",
                      }}
                      src={props.item.image}
                      alt="..."
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {props.item.name}
                  </TableCell>{" "}
                  <TableCell component="th" scope="row">
                    {props.chosenSize}
                  </TableCell>
                  <TableCell align="right">${props.item.price}</TableCell>
                  <TableCell>
                    <CardActions
                      disableSpacing
                      style={{
                        justifyContent: "space-between",
                        margin: "0 auto",
                        width: "50%",
                        display: "flex",
                      }}
                      color="secondary"
                    >
                      <IconButton
                        color="default"
                        aria-label="Add to Cart"
                        onClick={() => {
                          handleRemoveButtonClick(item.date);
                        }}
                      >
                        <ThumbDownOffAltIcon />
                      </IconButton>
                      <IconButton
                        to="/nike/cart"
                        aria-label="Show cart items"
                        color="secondary"
                        className="cart"
                        onClick={() => {
                          handleBuyButtonClick(props.item);
                        }}
                      >
                        <AddShoppingCart />
                      </IconButton>
                    </CardActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </>
  );
};

export default Favorite;
